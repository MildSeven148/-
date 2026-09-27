import { Link } from 'react-router-dom';
import { LANGUAGES, LEVELS, PERSONAS, MODULES } from '../mock/data';
import { SectionHead } from '../components/common';

const TESTIMONIALS = [
  { name: '林同学', role: '零基础 → 雅思 6.5', avatar: '🦌', text: '跟着分级课程一步步来，先测再学，完全不用自己摸索路径。口语跟读的评分让我知道差在哪。' },
  { name: 'Momo', role: '日语 N2 备考中', avatar: '🌸', text: '听力训练的场景很真实，慢速+常速切换特别友好。连续打卡 30 天，成就感拉满。' },
  { name: '老K', role: '职场英语学习者', avatar: '💼', text: '商务方向的课程直击痛点，邮件写作和会议表达都是现学现用。社区里还能找到同行交流。' },
];

const STEPS = [
  { icon: '🧭', title: '能力测评分层', desc: '注册时选择语言基础与目标，系统为你匹配零基础到专业的分级起点' },
  { icon: '🎯', title: '精准画像定制', desc: '留学、商务、翻译、旅行……按你的需求生成个性化学习路径' },
  { icon: '📈', title: '沉浸式互动学习', desc: '单词、语法、听力、口语四维联动，浏览器即时发音反馈' },
  { icon: '🏅', title: '成就与陪伴', desc: '进度可视化 + 徽章激励 + 社区互助，让坚持变得更有温度' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <div style={{ marginBottom: 18 }}>
              <span className="hero-chip">🌊 多语种</span>
              <span className="hero-chip">🪜 能力分层</span>
              <span className="hero-chip">🎧 沉浸式</span>
            </div>
            <h1>
              让每一门语言，
              <br />
              都成为你的<span className="hl">另一种生活</span>
            </h1>
            <p className="sub">
              语流 LinguaFlow 面向不同语言基础与学习目标的学习者，提供英语、日语、韩语等主流语言的
              分级课程、互动训练、进度追踪与社区成就体系，陪你从零基础走向专业深耕。
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-lg" style={{ background: '#fff', color: '#312e81', boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}>
                免费开始学习 →
              </Link>
              <Link to="/courses" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                浏览课程体系
              </Link>
            </div>
            <div className="hero-stats">
              <div><b>6+</b><span>覆盖语言</span></div>
              <div><b>5 级</b><span>能力分层</span></div>
              <div><b>6 类</b><span>精准画像</span></div>
              <div><b>4 维</b><span>互动训练</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="card" style={{ padding: 20, borderRadius: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span className="avatar sm">语</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>今日学习</div>
                  <div className="muted" style={{ fontSize: 12 }}>连续学习第 6 天</div>
                </div>
                <span className="pill pill-ok" style={{ marginLeft: 'auto' }}>🔥 6</span>
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                {[
                  { icon: '🃏', name: '单词记忆', val: '12/12', color: '#4f46e5' },
                  { icon: '✍️', name: '语法练习', val: '2/2', color: '#7c3aed' },
                  { icon: '🎧', name: '听力训练', val: '3/3', color: '#06b6d4' },
                  { icon: '🎙️', name: '口语跟读', val: '1/1', color: '#ec4899' },
                ].map((m) => (
                  <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 12, background: 'var(--bg)' }}>
                    <span>{m.icon}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 600 }}>{m.name}</span>
                    <span className="pill pill-ok" style={{ marginLeft: 'auto' }}>{m.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="float-card" style={{ top: -22, right: -18 }}>🏅 新成就「持之以恒」已解锁</div>
            <div className="float-card" style={{ bottom: -20, left: -26, animationDelay: '1.2s' }}>📈 本周已学 3 天，目标 5 天</div>
          </div>
        </div>
      </section>

      {/* 语言 */}
      <section className="section">
        <div className="container">
          <SectionHead
            title="选择一门语言，开始沉浸式之旅"
            sub="英语、日语、韩语课程已全面上线，更多语种持续规划中"
            extra={<Link to="/courses" className="btn btn-ghost">全部课程 →</Link>}
          />
          <div className="grid lang">
            {LANGUAGES.map((l) => (
              <Link to={`/courses?lang=${l.id}`} key={l.id} className={`lang-card${l.comingSoon ? ' coming' : ''}`}>
                {l.comingSoon && <span className="soon">即将上线</span>}
                <div className="topbar" style={{ background: `linear-gradient(90deg, ${l.color}, ${l.color}88)` }} />
                <div className="flag">{l.flag}</div>
                <div className="l-name">{l.name} <span className="l-native">{l.native}</span></div>
                <div className="l-desc">{l.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 分级课程 */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHead
            title="能力分层 · 因材施教"
            sub="无论你从零开始，还是已具备专业基础，都能找到最合适的起点"
          />
          <div className="grid level">
            {LEVELS.map((lv) => (
              <Link to={`/courses?level=${lv.id}`} key={lv.id} className="level-card">
                <div className="lv-icon">{lv.icon}</div>
                <div className="lv-name">{lv.name}</div>
                <div className="lv-tag">{lv.tag}</div>
                <div className="lv-desc">{lv.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 精准画像 */}
      <section className="section">
        <div className="container">
          <SectionHead
            title="精准画像 · 懂你的目标"
            sub="按留学、职场、翻译等需求定制学习路径，让每一次学习都直指你的目标"
          />
          <div className="grid persona">
            {PERSONAS.map((p) => (
              <Link to={`/register?persona=${p.id}`} key={p.id} className="persona-card">
                <div className="p-icon">{p.icon}</div>
                <div className="p-name">{p.name}</div>
                <div className="p-desc">{p.desc}</div>
                <div className="p-focus">
                  {p.focus.map((f) => (
                    <span key={f} className="tag" style={{ background: `${p.color}14`, color: p.color }}>{f}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 互动模块 */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHead
            title="四维互动 · 沉浸式训练"
            sub="每一个课时都包含单词、语法、听力、口语四类训练，浏览器原生发声，随时开练"
          />
          <div className="grid course">
            {MODULES.map((m) => (
              <div key={m.id} className="feature-card">
                <div className="f-icon">{m.icon}</div>
                <h3 style={{ fontSize: 18 }}>{m.name}</h3>
                <p className="muted" style={{ fontSize: 13.5, marginTop: 8 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 学习路径 */}
      <section className="section">
        <div className="container">
          <SectionHead title="四步开启你的语言进阶之路" sub="注册 → 画像 → 学习 → 成就，简单而高效" />
          <div className="grid course">
            {STEPS.map((s, i) => (
              <div key={s.title} className="card card-hover" style={{ padding: 26 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="pill pill-brand">Step {i + 1}</span>
                </div>
                <div style={{ fontSize: 34, margin: '16px 0 10px' }}>{s.icon}</div>
                <h3 style={{ fontSize: 17 }}>{s.title}</h3>
                <p className="muted" style={{ fontSize: 13.5, marginTop: 8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 用户评价 */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHead title="他们正在语流收获进步" sub="真实学习者这样说" />
          <div className="grid course">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card card-hover" style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span className="avatar">{t.avatar}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14.5 }}>{t.name}</div>
                    <div className="muted" style={{ fontSize: 12 }}>{t.role}</div>
                  </div>
                </div>
                <p className="ink2" style={{ fontSize: 14, lineHeight: 1.7 }}>“{t.text}”</p>
                <div style={{ color: '#f59e0b', fontSize: 13, marginTop: 10 }}>★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div
            className="card"
            style={{
              padding: '52px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden',
              background: 'radial-gradient(700px 300px at 50% -40%, rgba(124,58,237,0.25), transparent 60%), var(--surface)',
            }}
          >
            <div style={{ fontSize: 40 }}>🌊</div>
            <h2 style={{ fontSize: 30, margin: '12px 0 8px' }}>今天，就是最好的开始</h2>
            <p className="muted" style={{ fontSize: 15 }}>免费注册，3 分钟完成能力测评，开启属于你的语言之旅</p>
            <div style={{ marginTop: 24 }}>
              <Link to="/register" className="btn btn-primary btn-lg">立即注册，免费体验 →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
