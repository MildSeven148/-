import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LEVELS, PERSONAS, PERSONA_MOTTO, BADGES, getLang, getLevel, getLessonsOfCourse,
  getCourseProgressPct, recommendCourses, getLevelNameByXp,
} from '../mock/data';
import { StatCard, SectionHead, ProgressBar, EmptyState } from '../components/common';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 6) return '夜深了';
  if (h < 9) return '早上好';
  if (h < 12) return '上午好';
  if (h < 14) return '中午好';
  if (h < 18) return '下午好';
  if (h < 22) return '晚上好';
  return '夜深了';
};

const WEEK_LABELS = { mon: '一', tue: '二', wed: '三', thu: '四', fri: '五', sat: '六', sun: '日' };
const WEEK_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export default function Dashboard() {
  const { currentUser, db } = useApp();
  if (!currentUser) return null;

  const { progress } = currentUser;
  const lang = getLang(currentUser.langId);
  const persona = PERSONAS.find((p) => p.id === currentUser.personaId);
  const level = getLevelNameByXp(progress.xp);
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1];
  const levelPct = nextLevel ? Math.round(((progress.xp - level.xp) / (nextLevel.xp - level.xp)) * 100) : 100;

  const path = recommendCourses(currentUser);
  const continueLesson = (() => {
    for (const c of path) {
      const lessons = getLessonsOfCourse(c.id);
      const n = lessons.find((l) => !progress.completed.includes(l.id));
      if (n) return { course: c, lesson: n };
    }
    return null;
  })();
  const pathProgress = path.map((c) => ({ course: c, pct: getCourseProgressPct(c.id, progress.completed) }));
  const weekMax = Math.max(1, ...WEEK_ORDER.map((d) => progress.week[d] || 0));
  const ownedBadges = BADGES.filter((b) => progress.badges.includes(b.id));
  const lockedBadges = BADGES.filter((b) => !progress.badges.includes(b.id));

  return (
    <div className="container page" style={{ padding: '32px 24px 60px' }}>
      {/* 问候 Hero */}
      <div className="dash-hero" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="dh-greet">{greeting()}，{currentUser.name} {persona?.icon}</div>
            <div className="dh-sub">
              {persona?.name}画像 · 目标语言「{lang?.flag} {lang?.name}」 · {level.icon} 当前等级 {level.name}
            </div>
            {persona && (
              <div className="dh-sub" style={{ marginTop: 4 }}>“{PERSONA_MOTTO[persona.id]}”</div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span className="streak-flame">🔥 连续学习 {progress.streak} 天</span>
            <span className="streak-flame">⚡ {progress.xp} XP</span>
          </div>
        </div>
        <div style={{ maxWidth: 460, marginTop: 22 }}>
          {nextLevel ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>
                <span>{level.icon} {level.name}</span>
                <span>距 {nextLevel.icon} {nextLevel.name} 还差 {nextLevel.xp - progress.xp} XP</span>
              </div>
              <ProgressBar pct={levelPct} color="#fff" />
            </>
          ) : (
            <div className="dh-sub">已到达最高等级，你是语流的「大师级」学习者！</div>
          )}
        </div>
      </div>

      {/* 统计 */}
      <div className="grid stat" style={{ marginBottom: 24 }}>
        <StatCard icon="📚" value={progress.stats.lessons} label="已完成课时" color="#4f46e5" />
        <StatCard icon="📦" value={progress.stats.words} label="已学单词" color="#06b6d4" />
        <StatCard icon="🧩" value={progress.stats.grammar} label="语法练习" color="#7c3aed" />
        <StatCard icon="🎧" value={progress.stats.listening + progress.stats.speaking} label="听口训练" color="#ec4899" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 22, alignItems: 'start' }}>
        <div>
          {/* 继续学习 */}
          <SectionHead title="继续学习" sub="从上次中断的地方接着来" />
          {continueLesson ? (
            <div className="card card-hover" style={{ padding: 22, marginBottom: 26, border: '1.5px solid var(--brand)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <span className="pill pill-brand">{getLang(continueLesson.course.languageId).flag} {getLevel(continueLesson.course.levelId).name}</span>
                  <h3 style={{ marginTop: 10 }}>{continueLesson.lesson.title}</h3>
                  <p className="muted" style={{ fontSize: 13 }}>{continueLesson.lesson.subtitle}</p>
                </div>
                <Link to={`/lesson/${continueLesson.lesson.id}`} className="btn btn-primary btn-lg">▶ 立即学习</Link>
              </div>
              <div style={{ marginTop: 14 }}>
                <ProgressBar pct={pathProgress.find((p) => p.course.id === continueLesson.course.id).pct} />
                <span className="muted" style={{ fontSize: 12 }}>课程总进度 {pathProgress.find((p) => p.course.id === continueLesson.course.id).pct}%</span>
              </div>
            </div>
          ) : (
            <div className="card" style={{ marginBottom: 26 }}>
              <EmptyState icon="🎉" title="太棒了，所有推荐课程都已完成！" sub="去课程体系探索更多内容，或看看其他语言" />
            </div>
          )}

          {/* 个性化路径 */}
          <SectionHead title="我的个性化路径" sub={`依据「${persona?.name || '兴趣'}」画像与「${level.name}」能力定制`} />
          <div className="card" style={{ padding: 8 }}>
            {path.map((c, i) => {
              const pct = pathProgress[i].pct;
              const l = getLang(c.languageId);
              return (
                <Link key={c.id} to={`/courses/${c.id}`} className="lesson-row" style={{ borderTop: i > 0 ? '1px solid var(--line)' : 'none' }}>
                  <div className="li-icon" style={{ background: pct === 100 ? 'var(--ok-soft)' : 'var(--brand-soft)' }}>{pct === 100 ? '✅' : l.flag}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="li-title">{c.title}</div>
                    <div className="li-sub">{pct === 0 ? '尚未开始 · 建议按序学习' : `已完成 ${pct}%`}</div>
                    <div style={{ maxWidth: 260, marginTop: 6 }}>
                      <ProgressBar pct={pct} color={l.color} />
                    </div>
                  </div>
                  <span className="muted" style={{ fontSize: 13 }}>{i === 0 ? '当前起点' : `第 ${i + 1} 阶`} →</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          {/* 周活动 */}
          <SectionHead title="本周活动" sub={`本周已学习 ${Object.values(progress.week).reduce((a, b) => a + b, 0)} 次`} />
          <div className="card" style={{ padding: 20, marginBottom: 26 }}>
            <div className="week-bars">
              {WEEK_ORDER.map((d) => {
                const v = progress.week[d] || 0;
                return (
                  <div key={d} className="wb" title={`${v} 次学习`}>
                    <i style={{ height: `${Math.max(6, (v / weekMax) * 100)}%` }} />
                    <span>周{WEEK_LABELS[d]}</span>
                  </div>
                );
              })}
            </div>
            <p className="muted center" style={{ fontSize: 12, marginTop: 12 }}>
              {progress.lastStudyDate === new Date().toDateString() ? '今天已打卡 ✓ 保持住！' : '今天还没学习，花 5 分钟打卡吧 🌱'}
            </p>
          </div>

          {/* 快捷训练 */}
          <SectionHead title="快捷训练" sub="碎片时间也能提升" />
          <div className="card" style={{ padding: 14, marginBottom: 26 }}>
            {path[0] && (
              <div style={{ display: 'grid', gap: 8 }}>
                {['vocab', 'grammar', 'listening', 'speaking'].map((t, i) => {
                  const lesson = getLessonsOfCourse(path[0].id)[i];
                  if (!lesson) return null;
                  const icons = { vocab: '🃏', grammar: '✍️', listening: '🎧', speaking: '🎙️' };
                  const names = { vocab: '背单词', grammar: '刷语法', listening: '练听力', speaking: '说口语' };
                  return (
                    <Link key={t} to={`/lesson/${lesson.id}`} className="lesson-row" style={{ borderRadius: 12 }}>
                      <span style={{ fontSize: 22 }}>{icons[t]}</span>
                      <span style={{ fontWeight: 700, fontSize: 14.5 }}>{names[t]}</span>
                      <span className="muted" style={{ marginLeft: 'auto', fontSize: 12.5 }}>5-8 分钟 →</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 最近成就 */}
          <SectionHead title="成就徽章" extra={<Link to="/profile" className="muted" style={{ fontSize: 13 }}>查看全部 →</Link>} />
          <div className="grid badge" style={{ gap: 10 }}>
            {ownedBadges.slice(0, 6).map((b) => (
              <div key={b.id} className="badge-item" title={b.desc}>
                <div className="b-icon">{b.icon}</div>
                <b>{b.name}</b>
                <span>{b.desc}</span>
              </div>
            ))}
            {lockedBadges.slice(0, 2).map((b) => (
              <div key={b.id} className="badge-item locked" title={b.desc}>
                <div className="b-icon">{b.icon}</div>
                <b>{b.name}</b>
                <span>未解锁</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
