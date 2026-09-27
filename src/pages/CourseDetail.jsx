import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getCourse, getLang, getLevel, getLessonsOfCourse, getModule } from '../mock/data';
import { ProgressBar, EmptyState } from '../components/common';

export default function CourseDetail() {
  const { courseId } = useParams();
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const course = getCourse(courseId);

  if (!course) {
    return (
      <div className="container page" style={{ paddingTop: 60 }}>
        <EmptyState icon="🧭" title="课程不存在" sub="返回课程体系重新选择吧" />
      </div>
    );
  }

  const lang = getLang(course.languageId);
  const level = getLevel(course.levelId);
  const lessons = getLessonsOfCourse(course.id);
  const completed = currentUser?.progress.completed || [];
  const doneCount = lessons.filter((l) => completed.includes(l.id)).length;
  const pct = lessons.length ? Math.round((doneCount / lessons.length) * 100) : 0;
  const next = lessons.find((l) => !completed.includes(l.id)) || lessons[0];

  const openLesson = (lessonId) => {
    if (!currentUser) {
      navigate(`/login?next=/lesson/${lessonId}`);
      return;
    }
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <div className="container page" style={{ padding: '32px 24px 60px' }}>
      {/* Hero */}
      <div
        className="card"
        style={{
          padding: '34px 30px', color: '#fff', marginBottom: 26, position: 'relative', overflow: 'hidden',
          background: `radial-gradient(600px 300px at 90% -30%, ${lang.color}66, transparent 60%), linear-gradient(135deg, #1e1b4b, #312e81)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <Link to="/courses" className="pill" style={{ background: 'rgba(255,255,255,0.14)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>
            ← 全部课程
          </Link>
          <span className="pill" style={{ background: 'rgba(255,255,255,0.14)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>
            {lang.flag} {lang.name} · {lang.native}
          </span>
          <span className="pill" style={{ background: 'rgba(255,255,255,0.14)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>
            {level.icon} {level.name}
          </span>
        </div>
        <h1 style={{ fontSize: 32 }}>{course.title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', margin: '10px 0 20px' }}>{course.tagline}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{doneCount} / {lessons.length}</div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)' }}>已完成课时</div>
          </div>
          <div style={{ flex: 1, maxWidth: 320 }}>
            <ProgressBar pct={pct} color="#fff" />
          </div>
          <button className="btn" style={{ background: '#fff', color: '#312e81', fontWeight: 800 }} onClick={() => openLesson(next.id)}>
            {pct >= 100 ? '🔄 复习课程' : doneCount > 0 ? '▶ 继续学习' : '🚀 开始学习'}
          </button>
        </div>
      </div>

      {/* 课时列表 */}
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>课程目录</h2>
      <div className="card" style={{ overflow: 'hidden' }}>
        {lessons.map((l, i) => {
          const mod = getModule(l.type);
          const done = completed.includes(l.id);
          const isNext = next && next.id === l.id;
          return (
            <div key={l.id} className="lesson-row" onClick={() => openLesson(l.id)} style={{ borderTop: i > 0 ? '1px solid var(--line)' : 'none' }}>
              <div className="li-icon" style={{ background: done ? 'var(--ok-soft)' : 'var(--brand-soft)' }}>{done ? '✅' : mod.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="li-title">
                  {i + 1}. {l.title}
                  {isNext && <span className="pill pill-ok" style={{ marginLeft: 8 }}>推荐继续</span>}
                </div>
                <div className="li-sub">{l.subtitle}</div>
              </div>
              <div className="li-status">
                {done ? (
                  <span className="pill pill-ok">已完成</span>
                ) : (
                  <span className="pill" style={{ color: 'var(--brand)' }}>{mod.icon} {mod.name}</span>
                )}
                <span className="muted" style={{ fontSize: 13 }}>→</span>
              </div>
            </div>
          );
        })}
      </div>

      {!currentUser && (
        <div className="card" style={{ marginTop: 22, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 26 }}>🔒</span>
          <div style={{ flex: 1 }}>
            <b>登录后开始学习</b>
            <p className="muted" style={{ fontSize: 13 }}>记录进度、获得 XP 与成就徽章</p>
          </div>
          <Link to="/login" className="btn btn-primary">立即登录</Link>
          <Link to="/register" className="btn btn-ghost">免费注册</Link>
        </div>
      )}
    </div>
  );
}
