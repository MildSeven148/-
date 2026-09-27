import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getLevelNameByXp } from '../mock/data';

export default function Navbar() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const level = currentUser ? getLevelNameByXp(currentUser.progress.xp) : null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-mark">🌊</span>
          语流<span className="grad-text">LinguaFlow</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/courses" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>课程体系</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>学习中心</NavLink>
          <NavLink to="/community" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>社区交流</NavLink>
          <NavLink to="/profile" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>我的成就</NavLink>
        </nav>
        {currentUser ? (
          <div className="nav-user">
            {level && <span className="pill pill-brand">{level.icon} {level.name}</span>}
            <Link to="/profile" className="avatar" title={currentUser.name}>{currentUser.avatar}</Link>
            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>退出</button>
          </div>
        ) : (
          <div className="nav-user">
            <Link to="/login" className="btn btn-ghost btn-sm">登录</Link>
            <Link to="/register" className="btn btn-primary btn-sm">免费注册</Link>
          </div>
        )}
      </div>
    </header>
  );
}
