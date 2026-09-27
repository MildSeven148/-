/* 通用小组件 */
import { useMemo } from 'react';

export function SectionHead({ title, sub, extra }) {
  return (
    <div className="sec-head">
      <div>
        <h2>{title}</h2>
        {sub && <div className="sub">{sub}</div>}
      </div>
      {extra}
    </div>
  );
}

export function ProgressBar({ pct, color }) {
  return (
    <div className="progress">
      <i style={{ width: `${Math.min(100, Math.max(0, pct))}%`, background: color || undefined }} />
    </div>
  );
}

export function StatCard({ icon, value, label, color }) {
  return (
    <div className="stat-card">
      <div className="s-icon" style={{ background: `${color || '#eef2ff'}26`, color: color || '#4f46e5' }}>{icon}</div>
      <div>
        <b>{value}</b>
        <span>{label}</span>
      </div>
    </div>
  );
}

export function Modal({ open, onClose, children, wide }) {
  if (!open) return null;
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className={`modal${wide ? '' : ''}`} style={{ maxWidth: wide ? 760 : 560 }} onClick={(e) => e.stopPropagation()}>
        <button
          className="btn btn-ghost btn-sm"
          style={{ position: 'absolute', right: 18, top: 18, padding: '5px 10px', borderRadius: 10 }}
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        dur: 2.2 + Math.random() * 1.6,
        color: ['#4f46e5', '#7c3aed', '#06b6d4', '#ec4899', '#f59e0b', '#22c55e'][i % 6],
        rot: Math.random() * 360,
      })),
    []
  );
  return (
    <div className="confetti-wrap">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export function EmptyState({ icon, title, sub }) {
  return (
    <div className="empty">
      <div className="e-icon">{icon}</div>
      <b style={{ fontSize: 16 }}>{title}</b>
      <p style={{ marginTop: 6, fontSize: 13.5 }}>{sub}</p>
    </div>
  );
}
