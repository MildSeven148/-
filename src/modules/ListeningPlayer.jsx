import { useRef, useState } from 'react';
import { speak, stopSpeak } from '../utils/tts';

/* 听力训练：情景对话播放（TTS）→ 理解检测 */
export default function ListeningPlayer({ content, lang, onFinish }) {
  const [showScript, setShowScript] = useState(false);
  const [rate, setRate] = useState(1);
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState('listen'); // listen | quiz | result
  const finishedRef = useRef(false);

  if (!content || !content.script || !content.questions || !content.questions.length) {
    return (
      <div className="empty">
        <div className="e-icon">🎧</div>
        <b>本节暂无听力训练</b>
        <p style={{ marginTop: 6, fontSize: 13.5 }}>可在本课的「主推模块」中完成核心练习</p>
      </div>
    );
  }

  const q = content.questions[qIndex];

  const play = (r) => {
    setRate(r);
    speak(content.script, lang, r);
  };

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.ans) setCorrectCount((c) => c + 1);
  };

  const nextQ = () => {
    if (qIndex + 1 >= content.questions.length) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onFinish && onFinish();
      }
      setPhase('result');
    } else {
      setQIndex(qIndex + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    finishedRef.current = false;
    setQIndex(0);
    setPicked(null);
    setCorrectCount(0);
    setShowScript(false);
    setPhase('listen');
  };

  return (
    <div>
      {phase === 'listen' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span className="pill pill-brand">🎧 听力材料</span>
            <h3 style={{ fontSize: 19 }}>{content.title}</h3>
          </div>
          <div className="card" style={{ padding: '26px', textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎧</div>
            <p className="ink2" style={{ fontSize: 14, marginBottom: 16 }}>播放对话，尽量先不看文本完成理解</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => play(1)}>▶ 播放常速</button>
              <button className="btn btn-ghost" onClick={() => play(0.75)}>🐢 慢速播放</button>
              <button className="btn btn-ghost" onClick={stopSpeak}>⏹ 停止</button>
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="btn btn-soft btn-sm" onClick={() => setShowScript(!showScript)}>
                {showScript ? '收起原文' : '查看原文'}
              </button>
            </div>
            {showScript && (
              <div className="card" style={{ marginTop: 14, padding: 16, textAlign: 'left', background: 'var(--bg)' }}>
                <div style={{ whiteSpace: 'pre-line', fontSize: 14, fontWeight: 600 }}>{content.script}</div>
                <div className="muted" style={{ fontSize: 13, marginTop: 10, whiteSpace: 'pre-line' }}>{content.cn}</div>
              </div>
            )}
          </div>
          <button className="btn btn-primary" style={{ margin: '0 auto', display: 'flex' }} onClick={() => setPhase('quiz')}>
            听完了，开始答题 🎯
          </button>
        </>
      )}

      {phase === 'quiz' && q && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span className="pill pill-brand">理解检测 {qIndex + 1} / {content.questions.length}</span>
            <span className="muted" style={{ fontSize: 13 }}>答对 {correctCount} 题</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button className="btn btn-soft btn-sm" onClick={() => play(1)}>🔊 再听一遍</button>
            <button className="btn btn-soft btn-sm" onClick={() => setShowScript(!showScript)}>{showScript ? '隐藏原文' : '偷看原文'}</button>
          </div>
          {showScript && (
            <div className="card" style={{ marginBottom: 14, padding: 14, background: 'var(--bg)' }}>
              <div style={{ whiteSpace: 'pre-line', fontSize: 13.5, fontWeight: 600 }}>{content.script}</div>
            </div>
          )}
          <p style={{ fontSize: 16.5, fontWeight: 700, marginBottom: 14 }}>{q.q}</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {q.opts.map((o, i) => {
              let cls = 'opt';
              if (picked !== null) {
                if (i === q.ans) cls += ' correct';
                else if (i === picked) cls += ' wrong';
              }
              return (
                <button key={i} className={cls} disabled={picked !== null} onClick={() => pick(i)}>
                  <span className="opt-key">{'ABCD'[i]}</span>
                  {o}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <>
              <div className={`feedback ${picked === q.ans ? 'ok' : 'bad'}`}>
                {picked === q.ans ? '🎉 听得很准！' : `💡 正确答案：${q.opts[q.ans]}`}
                <span style={{ display: 'block', marginTop: 4 }}>{q.why}</span>
              </div>
              <div style={{ marginTop: 14, textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={nextQ}>{qIndex + 1 >= content.questions.length ? '查看结果' : '下一题 →'}</button>
              </div>
            </>
          )}
        </>
      )}

      {phase === 'result' && (
        <div className="center" style={{ padding: '30px 0' }}>
          <div style={{ fontSize: 52 }} className="bounce-in">{correctCount === content.questions.length ? '👂' : '🎧'}</div>
          <h3 style={{ margin: '14px 0 6px' }}>听力训练完成</h3>
          <p className="ink2">答对 <b className="grad-text" style={{ fontSize: 22 }}>{correctCount}</b> / {content.questions.length} 题</p>
          <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>
            {correctCount === content.questions.length ? '听力满分！试试不看原文再听一遍巩固。' : '建议对照原文再精听一遍，抓住关键词。'}
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 18 }}>
            <button className="btn btn-ghost" onClick={restart}>↺ 重听一次</button>
            <button className="btn btn-primary" onClick={() => { finishedRef.current = true; onFinish && onFinish(); }}>确认完成 ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}
