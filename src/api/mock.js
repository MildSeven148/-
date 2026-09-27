/* ============================================================
   语流 LinguaFlow · 模拟后端（localStorage 持久化）
   ============================================================ */
import { SEED_POSTS, defaultProgress, BADGES } from '../mock/data';

const DB_KEY = 'linguaflow_db_v4';

export function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const db = JSON.parse(raw);
      if (db && db.users && db.posts) return db;
    }
  } catch (e) {
    /* ignore */
  }
  const db = {
    users: [],
    posts: JSON.parse(JSON.stringify(SEED_POSTS)).map((p) => ({
      ...p,
      baseLikes: p.likes || 0,
      likedBy: [],
      comments: (p.comments || []).map((c) => ({ ...c, likedBy: [] })),
    })),
    nextId: 1,
  };
  saveDB(db);
  return db;
}

export function saveDB(db) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    /* ignore */
  }
}

export const uid = () =>
  'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

/* ---------- 成就判定 ---------- */
export function refreshBadges(progress) {
  const ctx = { ...progress.stats, xp: progress.xp, streak: progress.streak };
  const earned = BADGES.filter((b) => b.check(ctx)).map((b) => b.id);
  progress.badges = Array.from(new Set([...progress.badges, ...earned]));
  return progress;
}

/* ---------- 连续学习打卡 ---------- */
export function applyStreak(progress) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toDateString();
  const last = progress.lastStudyDate ? new Date(progress.lastStudyDate) : null;
  if (last) last.setHours(0, 0, 0, 0);
  if (progress.lastStudyDate !== todayStr) {
    if (last && today - last === 86400000) {
      progress.streak += 1;
    } else {
      progress.streak = 1;
    }
    progress.lastStudyDate = todayStr;
  }
  return progress;
}

/* ---------- 周活动记录 ---------- */
export function updateWeek(progress) {
  const wd = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()];
  progress.week[wd] = (progress.week[wd] || 0) + 1;
}

export { defaultProgress };
