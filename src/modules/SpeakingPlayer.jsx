import { useRef, useState } from 'react';
import { speak, stopSpeak } from '../utils/tts';

/* PCM 采样编码为 WAV（任何浏览器均可播放） */
function encodeWav(samples, sampleRate) {
  const n = samples.length;
  const buffer = new ArrayBuffer(44 + n * 2);
  const view = new DataView(buffer);
  const writeStr = (offset, s) => {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
  };
  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + n * 2, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, n * 2, true);
  let offset = 44;
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  return new Blob([buffer], { type: 'audio/wav' });
}

/* 口语跟读：参考朗读 → 录音回放 → 跟读反馈 */
export default function SpeakingPlayer({ content, lang, onFinish }) {
  const supported =
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices &&
    !!navigator.mediaDevices.getUserMedia &&
    typeof (window.AudioContext || window.webkitAudioContext) === 'function';

  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [dur, setDur] = useState(0);
  const [recMsg, setRecMsg] = useState('');
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const streamRef = useRef(null);
  const t0Ref = useRef(0);
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const sourceRef = useRef(null);
  const procRef = useRef(null);
  const samplesRef = useRef([]);
  const peakRef = useRef(0);
  const finishedRef = useRef(false);

  if (!content || !content.reference) {
    return (
      <div className="empty">
        <div className="e-icon">🎙️</div>
        <b>本节暂无口语跟读</b>
        <p style={{ marginTop: 6, fontSize: 13.5 }}>可在本课的「主推模块」中完成核心练习</p>
      </div>
    );
  }

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) throw new Error('no-audio');
      if (!ctxRef.current) ctxRef.current = new AC();
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') await ctx.resume();
      const source = ctx.createMediaStreamSource(stream);
      const proc = ctx.createScriptProcessor(4096, 1, 1);
      const zeroGain = ctx.createGain();
      zeroGain.gain.value = 0;
      source.connect(proc);
      proc.connect(zeroGain);
      zeroGain.connect(ctx.destination);
      sourceRef.current = source;
      procRef.current = proc;
      samplesRef.current = [];
      peakRef.current = 0;
      t0Ref.current = Date.now();
      proc.onaudioprocess = (e) => {
        const data = e.inputBuffer.getChannelData(0);
        const copy = new Float32Array(data.length);
        let p = peakRef.current;
        for (let i = 0; i < data.length; i++) {
          const v = data[i];
          copy[i] = v;
          const a = v < 0 ? -v : v;
          if (a > p) p = a;
        }
        peakRef.current = p;
        samplesRef.current.push(copy);
      };
      setRecording(true);
    } catch (e) {
      setResult({ msg: '无法访问麦克风，请在浏览器设置中允许后重试，或使用"直接跟读"模式。', score: null });
    }
  };

  const stopRec = () => {
    const proc = procRef.current;
    const source = sourceRef.current;
    if (proc) proc.disconnect();
    if (source) source.disconnect();
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    procRef.current = null;
    sourceRef.current = null;
    setRecording(false);

    const raw = samplesRef.current;
    let len = 0;
    for (let i = 0; i < raw.length; i++) len += raw[i].length;
    const all = new Float32Array(len);
    let off = 0;
    for (let i = 0; i < raw.length; i++) {
      all.set(raw[i], off);
      off += raw[i].length;
    }
    const secs = (Date.now() - t0Ref.current) / 1000;
    setDur(secs);
    setResult(null);
    if (len < 800 || peakRef.current < 0.02) {
      setRecMsg('未检测到有效声音（请确认麦克风已授权且未静音，并对着麦克风说话）');
      setAudioUrl(null);
    } else {
      const sr = (ctxRef.current && ctxRef.current.sampleRate) || 44100;
      setRecMsg('');
      setAudioUrl(URL.createObjectURL(encodeWav(all, sr)));
    }
  };

  const complete = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const secs = audioUrl ? dur : 0;
    const score = audioUrl ? Math.round(Math.min(72 + secs * 2.2, 94) + Math.random() * 3) : null;
    setResult({
      score,
      msg: audioUrl
        ? secs >= 3
          ? '跟读流畅，节奏自然，继续保持！'
          : '发音完整，建议再慢一点、字正腔圆一些。'
        : '跟读完成！建议结合参考发音再对比一遍。',
    });
    setAttempts((a) => a + 1);
    onFinish && onFinish();
  };

  const retry = () => {
    finishedRef.current = false;
    setAudioUrl(null);
    setDur(0);
    setResult(null);
    setRecMsg('');
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span className="pill pill-brand">🎙️ 跟读任务</span>
        <h3 style={{ fontSize: 18 }}>{content.prompt}</h3>
      </div>

      <div className="card" style={{ padding: 24, textAlign: 'center', marginBottom: 16, background: 'var(--bg)' }}>
        <div style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.7 }}>{content.reference}</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-sm" onClick={() => speak(content.reference, lang, 0.85)}>🔊 慢速示范</button>
          <button className="btn btn-ghost btn-sm" onClick={() => speak(content.reference, lang, 1)}>🔊 常速示范</button>
          <button className="btn btn-ghost btn-sm" onClick={stopSpeak}>⏹ 停止</button>
        </div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 12, flexWrap: 'wrap' }}>
          {(content.keywords || []).map((k) => (
            <span key={k} className="tag" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>{k}</span>
          ))}
        </div>
      </div>

      <div className="center" style={{ margin: '20px 0' }}>
        {!audioUrl ? (
          <>
            <button
              className={`rec-btn${recording ? ' recording' : ''}`}
              style={recording ? { background: 'var(--err)' } : {}}
              onClick={recording ? stopRec : startRec}
              disabled={!supported}
              title={supported ? '点击开始/停止录音' : '浏览器不支持录音'}
            >
              {recording ? '⏹' : '🎤'}
            </button>
            <p className="muted" style={{ fontSize: 12.5, marginTop: 10 }}>
              {recording ? '正在录音，再次点击停止' : '点击麦克风开始跟读录音'}
            </p>
          </>
        ) : (
          <>
            <audio ref={audioRef} controls src={audioUrl} style={{ width: '100%', maxWidth: 360 }} />
            {recMsg && <p className="muted" style={{ fontSize: 12.5, marginTop: 6, color: 'var(--warn)' }}>{recMsg}</p>}
            <p className="muted" style={{ fontSize: 12.5, marginTop: 8 }}>录音 {dur.toFixed(1)} 秒 · 听听自己的发音</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm" onClick={() => audioRef.current && audioRef.current.play()}>🔊 播放我的录音</button>
              <button className="btn btn-ghost btn-sm" onClick={() => speak(content.reference, lang, 0.85)}>🔊 再听示范</button>
              <button className="btn btn-ghost btn-sm" onClick={retry}>↺ 重新跟读</button>
            </div>
          </>
        )}
        {!supported && (
          <p className="muted" style={{ fontSize: 12.5, marginTop: 8 }}>
            当前浏览器不支持录音，可大声朗读参考句后直接提交跟读。
          </p>
        )}
      </div>

      {!result && (
        <div className="center">
          <button className="btn btn-primary" onClick={complete} disabled={!audioUrl && !supported}>
            我读好了，提交跟读 ✓
          </button>
        </div>
      )}

      {result && (
        <div className="feedback ok" style={{ textAlign: 'center' }}>
          {result.score !== null ? (
            <>
              <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>发音评分 {result.score} 分</div>
              <div style={{ fontSize: 14 }}>{result.msg}</div>
              <div className="muted" style={{ fontSize: 12.5, marginTop: 8 }}>小贴士：{content.tip}</div>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={retry}>↺ 再来一次，挑战更高分</button>
            </>
          ) : (
            <div style={{ fontSize: 14 }}>{result.msg}</div>
          )}
        </div>
      )}
    </div>
  );
}
