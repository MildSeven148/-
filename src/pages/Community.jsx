import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { EmptyState } from '../components/common';

export default function Community() {
  const { db, currentUser, toggleLike, addPost, addComment, showToast } = useApp();
  const [text, setText] = useState('');
  const [openComments, setOpenComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [activeFilter, setActiveFilter] = useState('hot'); // hot | new

  const posts = [...db.posts].sort((a, b) =>
    activeFilter === 'hot'
      ? b.baseLikes + b.likedBy.length - (a.baseLikes + a.likedBy.length)
      : (b.time === '刚刚' ? 1 : 0) - (a.time === '刚刚' ? 1 : 0)
  );

  const submitPost = () => {
    if (!text.trim()) return;
    const newBadges = addPost(text.trim());
    setText('');
    showToast('发布成功，你的分享会帮助更多人！', 'success');
    newBadges && newBadges.forEach((b) => showToast(`🏅 解锁成就「社群之星」`, 'success'));
  };

  const submitComment = (postId) => {
    const t = (commentText[postId] || '').trim();
    if (!t) return;
    addComment(postId, t);
    setCommentText({ ...commentText, [postId]: '' });
    showToast('评论成功', 'info');
  };

  return (
    <div className="container page" style={{ padding: '40px 24px 60px', maxWidth: 820 }}>
      <h1 style={{ fontSize: 30 }}>社区交流</h1>
      <p className="muted" style={{ margin: '8px 0 24px' }}>分享经验、组队打卡、互相鼓励 —— 学习路上不孤单</p>

      {/* 发布 */}
      {currentUser ? (
        <div className="card" style={{ padding: 18, marginBottom: 22 }}>
          <textarea
            className="textarea"
            placeholder={`${currentUser.name}，分享你的学习心得、打卡进度或提问吧…`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <span className="muted" style={{ fontSize: 12.5 }}>💡 真诚分享更容易获得同伴的回应</span>
            <button className="btn btn-primary" disabled={!text.trim()} onClick={submitPost}>发布动态</button>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: '18px 22px', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 24 }}>💬</span>
          <div style={{ flex: 1 }}>
            <b>登录后即可参与社区交流</b>
            <p className="muted" style={{ fontSize: 13 }}>发布动态可获得「社群之星」成就</p>
          </div>
          <Link to="/login" className="btn btn-primary">登录</Link>
        </div>
      )}

      {/* 筛选 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button className={`pill${activeFilter === 'hot' ? ' pill-brand' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setActiveFilter('hot')}>🔥 热门</button>
        <button className={`pill${activeFilter === 'new' ? ' pill-brand' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setActiveFilter('new')}>🕐 最新</button>
      </div>

      {/* 帖子 */}
      {posts.length === 0 ? (
        <EmptyState icon="🍃" title="还没有动态，来发第一条吧" sub="你的经验，是别人的灯塔" />
      ) : (
        posts.map((p) => {
          const likes = p.baseLikes + p.likedBy.length;
          const liked = currentUser && p.likedBy.includes(currentUser.id);
          const showCmts = openComments[p.id];
          return (
            <div key={p.id} className="post-card">
              <div className="post-head">
                <span className="avatar">{p.avatar}</span>
                <div>
                  <div className="ph-name">{p.authorName}</div>
                  <div className="ph-time">{p.time}</div>
                </div>
              </div>
              <div className="post-body">{p.text}</div>
              <div className="post-actions">
                <button
                  className={`btn btn-ghost btn-sm${liked ? '' : ''}`}
                  style={liked ? { background: 'var(--err-soft)', color: 'var(--err)', border: '1px solid #fecdca' } : {}}
                  onClick={() => currentUser ? toggleLike(p.id) : showToast('请先登录再点赞', 'info')}
                >
                  {liked ? '❤️ 已赞' : '🤍 点赞'} {likes > 0 && likes}
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => setOpenComments({ ...openComments, [p.id]: !showCmts })}>
                  💬 评论 {p.comments.length}
                </button>
              </div>

              {showCmts && (
                <div style={{ marginTop: 10 }}>
                  {p.comments.map((c) => (
                    <div key={c.id} className="comment">
                      <span className="avatar sm">{c.avatar}</span>
                      <div>
                        <b style={{ fontSize: 13 }}>{c.authorName}</b> <span className="muted" style={{ fontSize: 12 }}>{c.time}</span>
                        <div style={{ fontSize: 13.5 }}>{c.text}</div>
                      </div>
                    </div>
                  ))}
                  {currentUser ? (
                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                      <input
                        className="input"
                        style={{ flex: 1, padding: '9px 12px', fontSize: 13.5 }}
                        placeholder="友善评论，共同进步…"
                        value={commentText[p.id] || ''}
                        onChange={(e) => setCommentText({ ...commentText, [p.id]: e.target.value })}
                      />
                      <button className="btn btn-soft btn-sm" onClick={() => submitComment(p.id)}>发送</button>
                    </div>
                  ) : (
                    <p className="muted" style={{ fontSize: 12.5, marginTop: 10 }}>
                      <Link to="/login" style={{ color: 'var(--brand)', fontWeight: 700 }}>登录</Link> 后可参与评论
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
