import { useRef, useState } from 'react';

/* 语法练习：规则精讲 → 例题 → 即时纠错 */
export default function GrammarPlayer({ content, lang, onFinish }) {
  const [phase, setPhase] = useState('learn'); // learn | quiz | result
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const finishedRef = useRef(false);

  if (!content || !content.quiz || !content.quiz.length) {
    return (
      <div className="empty">
        <div className="e-icon">✍️</div>
        <b>本节暂无语法练习</b>
        <p style={{ marginTop: 6, fontSize: 13.5 }}>可在本课的「主推模块」中完成核心练习</p>
      </div>
    );
  }

  const q = content.quiz[qIndex];

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.ans) setCorrectCount((c) => c + 1);
  };

  const nextQ = () => {
    if (qIndex + 1 >= content.quiz.length) {
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
    setPhase('learn');
  };

  return (
    <div>
      {phase === 'learn' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span className="pill pill-brand">语法点</span>
            <h3 style={{ fontSize: 20 }}>{content.title}</h3>
          </div>
          <p className="ink2" style={{ fontSize: 15 }}>{content.intro}</p>
          <div
            style={{
              margin: '16px 0', padding: '14px 18px', borderRadius: 14,
              background: 'var(--brand-soft)', fontFamily: 'var(--mono)', fontSize: 14.5, fontWeight: 700, color: 'var(--brand)',
            }}
          >
            {content.pattern}
          </div>
          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {content.examples.map((e, i) => (
              <div key={i} style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid var(--line)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700 }}>{e.src}</div>
                <div className="muted" style={{ fontSize: 13 }}>{e.cn}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" onClick={() => setPhase('quiz')}>开始练习 ✍️</button>
        </>
      )}

      {phase === 'quiz' && q && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span className="pill pill-brand">练习 {qIndex + 1} / {content.quiz.length}</span>
            <span className="muted" style={{ fontSize: 13 }}>答对 {correctCount} 题</span>
          </div>
          <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>{q.q}</p>
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
                {picked === q.ans ? '🎉 正确！' : '💡 再想想，正确答案见下。'}
                <span style={{ display: 'block', marginTop: 4 }}>{q.why}</span>
              </div>
              <div style={{ marginTop: 14, textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={nextQ}>{qIndex + 1 >= content.quiz.length ? '查看结果' : '下一题 →'}</button>
              </div>
            </>
          )}
        </>
      )}

      {phase === 'result' && (
        <div className="center" style={{ padding: '30px 0' }}>
          <div style={{ fontSize: 52 }} className="bounce-in">{correctCount === content.quiz.length ? '🎉' : '📖'}</div>
          <h3 style={{ margin: '14px 0 6px' }}>练习完成</h3>
          <p className="ink2">答对 <b className="grad-text" style={{ fontSize: 22 }}>{correctCount}</b> / {content.quiz.length} 题</p>
          <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>
            {correctCount === content.quiz.length ? '语法点已拿下，记得在真实语境中多用多练！' : '规则已掌握大半，重练一次把易错点吃透。'}
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 18 }}>
            <button className="btn btn-ghost" onClick={restart}>↺ 重新练习</button>
            <button className="btn btn-primary" onClick={() => { finishedRef.current = true; onFinish && onFinish(); }}>确认完成 ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}
