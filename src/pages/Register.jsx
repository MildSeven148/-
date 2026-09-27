import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Register() {
  const { register, showToast } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const preset = params.get('persona') || '';
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError('密码至少 6 位');
      return;
    }
    if (form.password !== form.confirm) {
      setError('两次输入的密码不一致');
      return;
    }
    try {
      const u = register(form);
      showToast(`欢迎加入语流，${u.name}！`, 'success');
      navigate(preset ? `/onboarding?persona=${preset}` : '/onboarding');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container page" style={{ padding: '60px 24px' }}>
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-head">
          <div className="logo-big">🌊</div>
          <h2 style={{ fontSize: 24, marginTop: 10 }}>创建你的语流账号</h2>
          <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>注册后完成 3 步画像，即刻获得个性化学习路径</p>
        </div>
        {error && <div className="feedback bad" style={{ marginBottom: 16 }}>{error}</div>}
        <div className="field">
          <label>昵称</label>
          <input className="input" placeholder="怎么称呼你？" required
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="field">
          <label>邮箱</label>
          <input className="input" type="email" placeholder="you@example.com" required
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="field">
          <label>密码</label>
          <input className="input" type="password" placeholder="至少 6 位" required
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <div className="field">
          <label>确认密码</label>
          <input className="input" type="password" placeholder="再次输入密码" required
            value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
        </div>
        <button className="btn btn-primary btn-block btn-lg" type="submit">注 册</button>
        <p className="muted center" style={{ fontSize: 13.5, marginTop: 18 }}>
          已有账号？<Link to="/login" style={{ color: 'var(--brand)', fontWeight: 700 }}>直接登录</Link>
        </p>
      </form>
    </div>
  );
}
