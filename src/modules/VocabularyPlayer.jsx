import { useRef, useState } from 'react';
import { speak } from '../utils/tts';

/* 单词记忆：闪卡学习 → 拼写/释义测验 */
export default function VocabularyPlayer({ words, lang, onFinish }) {
  const [mode, setMode] = useState('study'); // study | quiz | result
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const finishedRef = useRef(false);

  const word = words && words.length ? words[Math.min(idx, words.length - 1)] : null;

  if (!word) {
    return (
      <div className="empty">
        <div className="e-icon">🃏</div>
        <b>本节暂未收录单词</b>
        <p style={{ marginTop: 6, fontSize: 13.5 }}>可在本课的「主推模块」中完成核心练习</p>
      </div>
    );
  }

  const startQuiz = () => {
    const qs = words.map((w, i) => {
      const distractors = words.filter((_, j) => j !== i).map((x) => x.meaning);
      while (distractors.length < 3) {
        distractors.push(['美好', '简单', '世界'][distractors.length % 3]);
      }
      const shuffled = distractors.sort(() => Math.random() - 0.5).slice(0, 3);
      const opts = [...shuffled, w.meaning].sort(() => Math.random() - 0.5);
      return { word: w, opts, ans: opts.indexOf(w.meaning) };
    });
    setQuiz(qs);
    setQi(0);
    setScore(0);
    setPicked(null);
    setMode('quiz');
  };

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === quiz[qi].ans) setScore((s) => s + 1);
  };

  const nextQ = () => {
    if (qi + 1 >= quiz.length) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onFinish && onFinish();
      }
      setMode('result');
    } else {
      setQi(qi + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    finishedRef.current = false;
    setIdx(0);
    setFlipped(false);
    setMode('study');
  };

  return (
    <div>
      {mode === 'study' && (
        <>
          <div className={`flashcard${flipped ? ' flipped' : ''}`} style={{ marginBottom: 20 }}>
            <div className="flashcard-inner">
              <div className="flashcard-face" onClick={() => setFlipped(!flipped)}>
                <span className="fc-hint">点击翻面</span>
                <div className="fc-word">{word.text}</div>
                <div className="fc-phon">{word.phonetic}</div>
                <span className="pill pill-brand" style={{ position: 'absolute', bottom: 14 }}>
                  第 {idx + 1} / {words.length} 张
                </span>
              </div>
              <div className="flashcard-face back" onClick={() => setFlipped(!flipped)}>
                <div className="fc-word" style={{ fontSize: 26 }}>{word.meaning}</div>
                <div className="ink2" style={{ fontSize: 14, maxWidth: 300, textAlign: 'center' }}>
                  {word.example}
                  <br />
                  <span className="muted">{word.exampleCn}</span>
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(word.text, lang);
                  }}
                >
                  🔊 发音
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button
              className="btn btn-ghost"
              disabled={idx === 0}
              onClick={() => { setIdx(idx - 1); setFlipped(false); }}
            >
              上一张
            </button>
            {idx < words.length - 1 ? (
              <button className="btn btn-primary" onClick={() => { setIdx(idx + 1); setFlipped(false); }}>
                下一张 →
              </button>
            ) : (
              <button className="btn btn-primary" onClick={startQuiz}>开始测验 🎯</button>
            )}
          </div>
        </>
      )}

      {mode === 'quiz' && quiz.length > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span className="pill pill-brand">测验 {qi + 1} / {quiz.length}</span>
            <span className="muted" style={{ fontSize: 13 }}>答对 {score} 题</span>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 18 }}>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{quiz[qi].word.text}</div>
            <div className="muted" style={{ fontSize: 13 }}>{quiz[qi].word.phonetic}</div>
            <button className="btn btn-soft btn-sm" style={{ marginTop: 8 }} onClick={() => speak(quiz[qi].word.text, lang)}>🔊 听发音</button>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {quiz[qi].opts.map((o, i) => {
              let cls = 'opt';
              if (picked !== null) {
                if (i === quiz[qi].ans) cls += ' correct';
                else if (i === picked) cls += ' wrong';
              }
              return (
                <button key={i} className={cls} disabled={picked !== null} onClick={() => pick(i)}>
                  <span className="opt-key">{'ABCD'[i]}</span>
                  {o}
                  {picked !== null && i === quiz[qi].ans && <span style={{ marginLeft: 'auto' }}>✅</span>}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <>
              <div className={`feedback ${picked === quiz[qi].ans ? 'ok' : 'bad'}`}>
                {picked === quiz[qi].ans ? '🎉 回答正确！' : `正确答案：${quiz[qi].opts[quiz[qi].ans]}`}
                <span className="muted" style={{ display: 'block', marginTop: 4 }}>{quiz[qi].word.example} · {quiz[qi].word.exampleCn}</span>
              </div>
              <div style={{ marginTop: 14, textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={nextQ}>{qi + 1 >= quiz.length ? '查看结果' : '下一题 →'}</button>
              </div>
            </>
          )}
        </>
      )}

      {mode === 'result' && (
        <div className="center" style={{ padding: '30px 0' }}>
          <div style={{ fontSize: 52 }} className="bounce-in">{score === quiz.length ? '🏆' : score >= quiz.length / 2 ? '🌟' : '💪'}</div>
          <h3 style={{ margin: '14px 0 6px' }}>测验完成</h3>
          <p className="ink2">答对 <b className="grad-text" style={{ fontSize: 22 }}>{score}</b> / {quiz.length} 题</p>
          <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>
            {score === quiz.length ? '全部正确，太棒了！记得明天复习巩固哦。' : score >= quiz.length / 2 ? '掌握得不错，再刷一轮会更牢固！' : '别灰心，回到闪卡再学一遍吧！'}
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 18 }}>
            <button className="btn btn-ghost" onClick={restart}>↺ 再学一轮</button>
            <button className="btn btn-primary" onClick={() => { finishedRef.current = true; onFinish && onFinish(); }}>确认完成 ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}
