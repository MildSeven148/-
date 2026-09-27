import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BADGES, LANGUAGES, LEVELS, PERSONAS, getLang, getLevelNameByXp, getPersona } from '../mock/data';
import { StatCard, SectionHead } from '../components/common';

export default function Profile() {
  const { currentUser, updateProfile, showToast, logout } = useApp();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(
    currentUser ? { langId: currentUser.langId, levelId: currentUser.levelId, personaId: currentUser.personaId } : null
  );

  if (!currentUser || !form) return null;
  const { progress } = currentUser;
  const level = getLevelNameByXp(progress.xp);
  const persona = getPersona(currentUser.personaId);
  const lang = getLang(currentUser.langId);

  const save = () => {
    updateProfile(form);
    setEditing(false);
    const lv = LEVELS.find((l) => l.id === form.levelId);
    showToast(`画像已更新！学习起点：${lv ? `${lv.icon} ${lv.name}` : ''} ✨`, 'success');
  };

  const resetDemo = () => {
    localStorage.removeItem('linguaflow_db_v4');
    localStorage.removeItem('linguaflow_session');
    logout();
    window.location.href = '/';
  };

  const owned = BADGES.filter((b) => progress.badges.includes(b.id));
  const locked = BADGES.filter((b) => !progress.badges.includes(b.id));

  return (
    <div className="container page" style={{ padding: '36px 24px 60px', maxWidth: 980 }}>
      {/* 头部 */}
      <div className="card" style={{ padding: '28px 30px', marginBottom: 24, display: 'flex', gap: 22, alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="avatar" style={{ width: 72, height: 72, fontSize: 30 }}>{currentUser.avatar}</div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <h1 style={{ fontSize: 24 }}>{currentUser.name}</h1>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            <span className="pill pill-brand">{lang.flag} {lang.name}</span>
            <span className="pill pill-brand">{level.icon} {level.name}</span>
            <span className="pill">{persona.icon} {persona.name}画像</span>
            <span className="pill">🔥 {progress.streak} 天</span>
          </div>
          <p className="muted" style={{ fontSize: 12.5, marginTop: 8 }}>
            加入于 {new Date(currentUser.joinedAt).toLocaleDateString('zh-CN')} · 共学习 {progress.studyMins} 分钟
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn-ghost" onClick={() => setEditing(!editing)}>{editing ? '取消' : '调整画像'}</button>
          <button className="btn btn-ghost" style={{ color: 'var(--err)' }} onClick={resetDemo}>重置演示数据</button>
        </div>
      </div>

      {/* 编辑画像 */}
      {editing && (
        <div className="card bounce-in" style={{ padding: 24, marginBottom: 24 }}>
          <h3 style={{ marginBottom: 6 }}>调整学习画像（学习路径将随之更新）</h3>
          <p className="muted" style={{ fontSize: 12.5, marginBottom: 16 }}>
            说明：这里调整的是「能力起点」，用于生成个性化推荐路径；页面顶部的「当前等级」由累计 XP 自动决定，无需手动修改。
          </p>
          <div className="field">
            <label>目标语言</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {LANGUAGES.filter((l) => !l.comingSoon).map((l) => (
                <button key={l.id} type="button" className={`pill${form.langId === l.id ? ' pill-brand' : ''}`} style={{ cursor: 'pointer', fontSize: 13.5 }} onClick={() => setForm({ ...form, langId: l.id })}>
                  {l.flag} {l.name}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>能力起点</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {LEVELS.map((lv) => (
                <button key={lv.id} type="button" className={`pill${form.levelId === lv.id ? ' pill-brand' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setForm({ ...form, levelId: lv.id })}>
                  {lv.icon} {lv.name}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>精准画像</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PERSONAS.map((p) => (
                <button key={p.id} type="button" className={`pill${form.personaId === p.id ? ' pill-brand' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setForm({ ...form, personaId: p.id })}>
                  {p.icon} {p.name}
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-primary" onClick={save}>保存并重新匹配路径</button>
        </div>
      )}

      {/* 统计 */}
      <div className="grid stat" style={{ marginBottom: 28 }}>
        <StatCard icon="⚡" value={progress.xp} label="累计 XP" color="#f59e0b" />
        <StatCard icon="📚" value={progress.stats.lessons} label="完成课时" color="#4f46e5" />
        <StatCard icon="📦" value={progress.stats.words} label="单词" color="#06b6d4" />
        <StatCard icon="🏅" value={owned.length} label={`成就 ${owned.length}/${BADGES.length}`} color="#7c3aed" />
      </div>

      {/* 成就墙 */}
      <SectionHead title="成就墙" sub={`已点亮 ${owned.length} / ${BADGES.length} 枚徽章`} />
      <div className="grid badge" style={{ gap: 12, marginBottom: 28 }}>
        {BADGES.map((b) => {
          const got = progress.badges.includes(b.id);
          return (
            <div key={b.id} className={`badge-item${got ? '' : ' locked'}`} title={b.desc}>
              <div className="b-icon">{b.icon}</div>
              <b>{b.name}</b>
              <span>{got ? b.desc : '未解锁'}</span>
            </div>
          );
        })}
      </div>

      {locked.length > 0 && (
        <div className="card" style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🎯</span>
          <p className="ink2" style={{ fontSize: 13.5 }}>
            下一枚可解锁徽章：<b>{locked[0].name}</b>（{locked[0].desc}）。去学习中心继续努力吧！
          </p>
          <button className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => navigate('/dashboard')}>
            去学习 →
          </button>
        </div>
      )}
    </div>
  );
}
