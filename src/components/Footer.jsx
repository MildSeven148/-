import { Link } from 'react-router-dom';
import { LANGUAGES } from '../mock/data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="nav-logo" style={{ marginBottom: 12, display: 'inline-flex' }}>
              <span className="logo-mark">🌊</span>
              语流 <span className="grad-text">LinguaFlow</span>
            </Link>
            <p className="muted" style={{ fontSize: 13.5, marginTop: 10, maxWidth: 300 }}>
              面向不同语言能力与学习目标的学习者，提供沉浸式、个性化、可追踪的多语种学习体验。
            </p>
          </div>
          <div>
            <h4>学习</h4>
            <Link className="link" to="/courses">课程体系</Link>
            <Link className="link" to="/dashboard">学习中心</Link>
            <Link className="link" to="/profile">成就徽章</Link>
          </div>
          <div>
            <h4>语言</h4>
            {LANGUAGES.filter((l) => !l.comingSoon).map((l) => (
              <Link key={l.id} className="link" to={`/courses?lang=${l.id}`}>{l.flag} {l.name} · {l.native}</Link>
            ))}
          </div>
          <div>
            <h4>社区</h4>
            <Link className="link" to="/community">交流广场</Link>
            <Link className="link" to="/register">加入我们</Link>
            <span className="link" style={{ cursor: 'default' }}>帮助中心（筹备中）</span>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 语流 LinguaFlow · 让每一种热爱，都有处发声。本站为演示项目，数据均为本地模拟。
        </div>
      </div>
    </footer>
  );
}
