import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LANGUAGES, LEVELS, PERSONAS, PERSONA_MOTTO } from '../mock/data';
import { Modal } from '../components/common';

const ASSESS = [
  { q: '目标语言的基础问候语（如“你好、谢谢”），你掌握得如何？', opts: ['完全不会', '认识一些', '比较熟悉', '脱口而出'] },
  { q: '听慢速的日常对话时，你能听懂多少？', opts: ['几乎听不懂', '抓住零星关键词', '听懂大意', '基本全懂'] },
  { q: '能否用目标语言做一分钟的自我介绍？', opts: ['不能', '说得磕磕绊绊', '比较流畅', '非常流利'] },
  { q: '是否接触过新闻、学术等进阶材料？', opts: ['从没接触', '偶尔接触', '经常阅读', '专业级水平'] },
];

const assessToLevel = (score) => {
  if (score <= 3) return 'starter';
  if (score <= 5) return 'elementary';
  if (score <= 7) return 'junior';
  if (score <= 9) return 'senior';
  return 'advanced';
};

export default function Onboarding() {
  const { currentUser, updateProfile, showToast } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const presetPersona = params.get('persona') || '';

  const [step, setStep] = useState(1);
  const [langId, setLangId] = useState(currentUser?.langId || 'en');
  const [levelId, setLevelId] = useState(currentUser?.levelId || 'starter');
  const [personaId, setPersonaId] = useState(presetPersona || currentUser?.personaId || 'interest');

  const [assessOpen, setAssessOpen] = useState(false);
  const [answers, setAnswers] = useState(Array(ASSESS.length).fill(-1));
  const [assessScore, setAssessScore] = useState(null);

  useEffect(() => {
    if (!currentUser) navigate('/register');
  }, [currentUser, navigate]);

  const finishAssess = () => {
    if (answers.some((a) => a < 0)) return;
    const score = answers.reduce((s, a) => s + a, 0);
    const lv = assessToLevel(score);
    setAssessScore(score);
    setLevelId(lv);
    setAssessOpen(false);
    showToast(`测评完成！为你推荐能力起点：${LEVELS.find((l) => l.id === lv).name}`, 'info');
  };

  const finish = () => {
    updateProfile({ langId, levelId, personaId });
    showToast('画像已生成，个性化学习路径已就绪 ✨', 'success');
    navigate('/dashboard');
  };

  const persona = PERSONAS.find((p) => p.id === personaId);
  const level = LEVELS.find((l) => l.id === levelId);

  return (
    <div className="container page" style={{ maxWidth: 900, padding: '48px 24px 72px' }}>
      <div className="center" style={{ marginBottom: 30 }}>
        <div className="logo-big">🌊</div>
        <h1 style={{ fontSize: 28, marginTop: 8 }}>完成画像，定制你的学习路径</h1>
        <p className="muted" style={{ marginTop: 6 }}>仅需 3 步，让我们更懂你</p>
      </div>

      <div className="steps">
        {[1, 2, 3].map((s) => (
          <div key={s} style={{ display: 'contents' }}>
            <div className={`step ${step === s ? 'active' : step > s ? 'done' : ''}`}>
              <span className="s-dot">{step > s ? '✓' : s}</span>
              {s === 1 ? '选择语言' : s === 2 ? '能力分层' : '精准画像'}
            </div>
            {s < 3 && <div className="step-line" />}
          </div>
        ))}
      </div>

      {/* Step 1 语言 */}
      {step === 1 && (
        <>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {LANGUAGES.filter((l) => !l.comingSoon).map((l) => (
              <button key={l.id} className={`pick-card${langId === l.id ? ' sel' : ''}`} onClick={() => setLangId(l.id)}>
                <div className="pk-icon">{l.flag}</div>
                <b>{l.name}</b>
                <span>{l.native}</span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 30, textAlign: 'center' }}>
            <button className="btn btn-primary btn-lg" onClick={() => setStep(2)}>下一步：能力分层 →</button>
          </div>
        </>
      )}

      {/* Step 2 能力分层 */}
      {step === 2 && (
        <>
          <div style={{ marginBottom: 18, textAlign: 'center' }}>
            <button className="btn btn-soft" onClick={() => setAssessOpen(true)}>🧭 不确定自己的水平？来做个 30 秒测评</button>
            {assessScore !== null && <span className="pill pill-ok" style={{ marginLeft: 10 }}>测评得分 {assessScore} 分</span>}
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {LEVELS.map((lv) => (
              <button key={lv.id} className={`pick-card${levelId === lv.id ? ' sel' : ''}`} onClick={() => setLevelId(lv.id)}>
                <div className="pk-icon">{lv.icon}</div>
                <b>{lv.name}</b>
                <span>{lv.tag}</span>
              </button>
            ))}
          </div>
          <div className="card" style={{ marginTop: 20, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ fontSize: 30 }}>{level?.icon}</span>
            <div>
              <b>{level?.name}</b>
              <p className="muted" style={{ fontSize: 13.5 }}>{level?.desc}</p>
            </div>
          </div>
          <div style={{ marginTop: 30, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-ghost btn-lg" onClick={() => setStep(1)}>← 上一步</button>
            <button className="btn btn-primary btn-lg" onClick={() => setStep(3)}>下一步：精准画像 →</button>
          </div>
        </>
      )}

      {/* Step 3 精准画像 */}
      {step === 3 && (
        <>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {PERSONAS.map((p) => (
              <button key={p.id} className={`pick-card${personaId === p.id ? ' sel' : ''}`} onClick={() => setPersonaId(p.id)}>
                <div className="pk-icon">{p.icon}</div>
                <b>{p.name}</b>
                <span>{p.desc}</span>
              </button>
            ))}
          </div>
          {persona && (
            <div className="card bounce-in" style={{ marginTop: 22, padding: '20px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 30 }}>{persona.icon}</div>
              <h3 style={{ margin: '8px 0 4px' }}>{persona.name}学习画像 · {PERSONA_MOTTO[persona.id]}</h3>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 10 }}>
                {persona.focus.map((f) => (
                  <span key={f} className="tag" style={{ background: `${persona.color}14`, color: persona.color }}>{f}</span>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginTop: 30, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-ghost btn-lg" onClick={() => setStep(2)}>← 上一步</button>
            <button className="btn btn-primary btn-lg" onClick={finish}>生成我的学习路径 🚀</button>
          </div>
        </>
      )}

      {/* 能力测评弹窗 */}
      <Modal open={assessOpen} onClose={() => setAssessOpen(false)}>
        <h3 style={{ marginBottom: 6 }}>🧭 30 秒能力测评</h3>
        <p className="muted" style={{ fontSize: 13.5, marginBottom: 18 }}>如实作答，系统会推荐最合适的能力分层起点</p>
        {ASSESS.map((a, i) => (
          <div key={i} className="field">
            <label>{i + 1}. {a.q}</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {a.opts.map((o, j) => (
                <button key={j} className={`opt${answers[i] === j ? answers[i] >= 2 ? ' correct' : '' : ''}`}
                  style={answers[i] === j ? { borderColor: 'var(--brand)', background: 'var(--brand-soft)' } : {}}
                  onClick={() => setAnswers((prev) => prev.map((x, k) => (k === i ? j : x)))}>
                  <span className="opt-key">{'ABCD'[j]}</span>
                  {o}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button className="btn btn-primary btn-block" disabled={answers.some((a) => a < 0)} onClick={finishAssess}>
          完成测评，查看推荐起点
        </button>
      </Modal>
    </div>
  );
}
