import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { COURSES, LANGUAGES, LEVELS, getLang, getLevel, getCourseProgressPct, getLessonsOfCourse } from '../mock/data';
import { ProgressBar, EmptyState } from '../components/common';

export default function Courses() {
  const { currentUser } = useApp();
  const [params, setParams] = useSearchParams();
  const lang = params.get('lang') || 'all';
  const level = params.get('level') || 'all';
  const [kw, setKw] = useState('');

  const list = useMemo(
    () =>
      COURSES.filter((c) => (lang === 'all' || c.languageId === lang) && (level === 'all' || c.levelId === level))
        .filter((c) => {
          if (!kw.trim()) return true;
          const l = getLang(c.languageId);
          const lv = getLevel(c.levelId);
          return `${l?.name}${lv?.name}${c.tagline}`.includes(kw.trim());
        })
        .sort((a, b) => (a.languageId === b.languageId ? LEVELS.findIndex((x) => x.id === a.levelId) - LEVELS.findIndex((x) => x.id === b.levelId) : a.languageId.localeCompare(b.languageId))),
    [lang, level, kw]
  );

  const setFilter = (k, v) => {
    const next = new URLSearchParams(params);
    if (v === 'all') next.delete(k);
    else next.set(k, v);
    setParams(next, { replace: true });
  };

  return (
    <div className="container page" style={{ padding: '40px 24px 60px' }}>
      <h1 style={{ fontSize: 30 }}>课程体系</h1>
      <p className="muted" style={{ margin: '8px 0 24px' }}>按语言与能力分层浏览课程，登录后记录你的学习进度</p>

      {/* 筛选 */}
      <div className="card" style={{ padding: '18px 20px', marginBottom: 26 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 12 }}>
          <span className="muted" style={{ fontSize: 13, fontWeight: 700 }}>语言</span>
          <button className={`pill${lang === 'all' ? ' pill-brand' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setFilter('lang', 'all')}>全部</button>
          {LANGUAGES.filter((l) => !l.comingSoon).map((l) => (
            <button key={l.id} className={`pill${lang === l.id ? ' pill-brand' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setFilter('lang', l.id)}>
              {l.flag} {l.name}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <span className="muted" style={{ fontSize: 13, fontWeight: 700 }}>分级</span>
          <button className={`pill${level === 'all' ? ' pill-brand' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setFilter('level', 'all')}>全部</button>
          {LEVELS.map((lv) => (
            <button key={lv.id} className={`pill${level === lv.id ? ' pill-brand' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setFilter('level', lv.id)}>
              {lv.icon} {lv.name}
            </button>
          ))}
        </div>
        <input
          className="input"
          style={{ marginTop: 14 }}
          placeholder="🔍 搜索课程关键词，如「英语」「高级」「语法」"
          value={kw}
          onChange={(e) => setKw(e.target.value)}
        />
      </div>

      {list.length === 0 ? (
        <EmptyState icon="🔭" title="没有找到匹配的课程" sub="换个筛选条件试试吧" />
      ) : (
        <div className="grid course">
          {list.map((c) => {
            const l = getLang(c.languageId);
            const lv = getLevel(c.levelId);
            const pct = currentUser ? getCourseProgressPct(c.id, currentUser.progress.completed) : 0;
            const total = getLessonsOfCourse(c.id).length;
            return (
              <Link to={`/courses/${c.id}`} key={c.id} className="course-card">
                <div className="cc-top">
                  <span className="pill" style={{ background: `${l.color}1a`, color: l.color, borderColor: 'transparent' }}>{l.flag} {l.name}</span>
                  <span className="pill pill-brand">{lv.icon} {lv.name}</span>
                </div>
                <div className="cc-title">{c.title}</div>
                <div className="cc-sub">{c.tagline}</div>
                <div className="cc-foot">
                  <span>📚 {total} 个课时 · {c.totalXp} XP</span>
                  {currentUser && <span>{pct === 100 ? '✅ 已通关' : pct > 0 ? `已完成 ${pct}%` : '开始学习 →'}</span>}
                  {!currentUser && <span>🔒 登录解锁进度</span>}
                </div>
                {currentUser && pct > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <ProgressBar pct={pct} color={l.color} />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
