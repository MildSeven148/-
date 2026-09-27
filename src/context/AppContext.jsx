/* ============================================================
   语流 LinguaFlow · 全局状态（用户 / 进度 / 成就 / 社区 / Toast）
   ============================================================ */
import { createContext, useCallback, useContext, useState } from 'react';
import { loadDB, saveDB, uid, refreshBadges, applyStreak, updateWeek, defaultProgress } from '../api/mock';

const AppCtx = createContext(null);
const SESSION_KEY = 'linguaflow_session';

export function AppProvider({ children }) {
  const [db, setDb] = useState(() => loadDB());
  const [currentUserId, setCurrentUserId] = useState(() => localStorage.getItem(SESSION_KEY));
  const [toasts, setToasts] = useState([]);

  const persist = (next) => {
    setDb(next);
    saveDB(next);
  };

  const showToast = useCallback((msg, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const currentUser = db.users.find((u) => u.id === currentUserId) || null;

  /* ---------- 认证 ---------- */
  const register = ({ name, email, password }) => {
    if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('该邮箱已注册，请直接登录');
    }
    const user = {
      id: uid(),
      name,
      email,
      password,
      avatar: name.trim().slice(0, 1).toUpperCase() || '语',
      langId: 'en',
      levelId: 'starter',
      personaId: 'interest',
      joinedAt: Date.now(),
      progress: defaultProgress(),
    };
    persist({ ...db, users: [...db.users, user] });
    setCurrentUserId(user.id);
    localStorage.setItem(SESSION_KEY, user.id);
    return user;
  };

  const login = ({ email, password }) => {
    const u = db.users.find((x) => x.email.toLowerCase() === email.toLowerCase());
    if (!u || u.password !== password) {
      throw new Error('邮箱或密码不正确，请重试');
    }
    setCurrentUserId(u.id);
    localStorage.setItem(SESSION_KEY, u.id);
    return u;
  };

  const logout = () => {
    setCurrentUserId(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updateProfile = (patch) => {
    if (!currentUser) return;
    persist({ ...db, users: db.users.map((u) => (u.id === currentUser.id ? { ...u, ...patch } : u)) });
  };

  /* ---------- 学习行为记录 ---------- */
  const recordActivity = ({
    lessonId = null,
    completeLesson = false,
    xp = 0,
    words = 0,
    grammar = 0,
    listening = 0,
    speaking = 0,
    minutes = 1,
  }) => {
    if (!currentUser) return [];
    const prev = currentUser.progress;
    const p = {
      ...prev,
      completed: [...prev.completed],
      stats: { ...prev.stats },
      week: { ...prev.week },
      badges: [...prev.badges],
    };
    p.xp += xp;
    p.studyMins += minutes;
    p.stats.words += words;
    p.stats.grammar += grammar;
    p.stats.listening += listening;
    p.stats.speaking += speaking;
    if (completeLesson && lessonId && !p.completed.includes(lessonId)) {
      p.completed.push(lessonId);
      p.stats.lessons += 1;
    }
    applyStreak(p);
    updateWeek(p);
    refreshBadges(p);
    const newBadges = p.badges.filter((b) => !prev.badges.includes(b));
    const updated = { ...currentUser, progress: p };
    persist({ ...db, users: db.users.map((u) => (u.id === currentUser.id ? updated : u)) });
    return newBadges;
  };

  /* ---------- 社区 ---------- */
  const toggleLike = (postId) => {
    if (!currentUser) return;
    const posts = db.posts.map((p) => {
      if (p.id !== postId) return p;
      const has = p.likedBy.includes(currentUser.id);
      return { ...p, likedBy: has ? p.likedBy.filter((x) => x !== currentUser.id) : [...p.likedBy, currentUser.id] };
    });
    persist({ ...db, posts });
  };

  const addPost = (text) => {
    if (!currentUser) return;
    const post = {
      id: uid(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      avatar: currentUser.avatar,
      time: '刚刚',
      text,
      baseLikes: 0,
      likedBy: [],
      comments: [],
    };
    persist({ ...db, posts: [post, ...db.posts] });
    const prev = currentUser.progress;
    const p = { ...prev, stats: { ...prev.stats, posts: prev.stats.posts + 1 }, badges: [...prev.badges] };
    refreshBadges(p);
    persist({ ...db, posts: [post, ...db.posts], users: db.users.map((u) => (u.id === currentUser.id ? { ...u, progress: p } : u)) });
    const newBadges = p.badges.filter((b) => !prev.badges.includes(b));
    return newBadges;
  };

  const addComment = (postId, text) => {
    if (!currentUser || !text.trim()) return;
    const comment = {
      id: uid(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      avatar: currentUser.avatar,
      time: '刚刚',
      text: text.trim(),
    };
    persist({
      ...db,
      posts: db.posts.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)),
    });
  };

  return (
    <AppCtx.Provider
      value={{
        db,
        currentUser,
        toasts,
        showToast,
        register,
        login,
        logout,
        updateProfile,
        recordActivity,
        toggleLike,
        addPost,
        addComment,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
}

export const useApp = () => useContext(AppCtx);
