import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { login, showToast } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/dashboard';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    try {
      const u = login(form);
      showToast(`欢迎回来，${u.name}！`, 'success');
      navigate(next, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container page" style={{ padding: '72px 24px' }}>
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-head">
          <div className="logo-big">🌊</div>
          <h2 style={{ fontSize: 24, marginTop: 10 }}>欢迎回来</h2>
          <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>登录语流，继续你的语言进阶之旅</p>
        </div>
        {error && <div className="feedback bad" style={{ marginBottom: 16 }}>{error}</div>}
        <div className="field">
          <label>邮箱</label>
          <input className="input" type="email" placeholder="you@example.com" required
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="field">
          <label>密码</label>
          <input className="input" type="password" placeholder="请输入密码" required
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <button className="btn btn-primary btn-block btn-lg" type="submit">登 录</button>
        <p className="muted center" style={{ fontSize: 13.5, marginTop: 18 }}>
          还没有账号？<Link to="/register" style={{ color: 'var(--brand)', fontWeight: 700 }}>免费注册</Link>
        </p>
      </form>
    </div>
  );
}
