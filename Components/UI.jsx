import React from 'react';

// ── Panel ──────────────────────────────────────────────
export function Panel({ children, className = '', accent = false }) {
  return (
    <div style={{
      background: 'var(--panel)',
      border: `1px solid ${accent ? 'var(--cyan)' : 'var(--border)'}`,
      borderRadius: 0,
      position: 'relative',
      ...(accent ? { boxShadow: '0 0 20px rgba(0,212,255,0.08)' } : {}),
    }} className={className}>
      {children}
    </div>
  );
}

// ── Button ─────────────────────────────────────────────
export function Button({ children, onClick, variant = 'primary', disabled = false, className = '', style = {} }) {
  const styles = {
    primary: {
      background: 'transparent',
      border: '1px solid var(--cyan)',
      color: 'var(--cyan)',
      fontFamily: 'var(--mono)',
      fontSize: '0.75rem',
      letterSpacing: '0.1em',
      padding: '0.65rem 1.5rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'all 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      userSelect: 'none',
    },
    secondary: {
      background: 'transparent',
      border: '1px solid var(--border2)',
      color: 'var(--text2)',
      fontFamily: 'var(--mono)',
      fontSize: '0.75rem',
      letterSpacing: '0.1em',
      padding: '0.65rem 1.5rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'all 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      userSelect: 'none',
    },
    green: {
      background: 'transparent',
      border: '1px solid var(--green)',
      color: 'var(--green)',
      fontFamily: 'var(--mono)',
      fontSize: '0.75rem',
      letterSpacing: '0.1em',
      padding: '0.65rem 1.5rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'all 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      userSelect: 'none',
    },
    danger: {
      background: 'transparent',
      border: '1px solid var(--red)',
      color: 'var(--red)',
      fontFamily: 'var(--mono)',
      fontSize: '0.75rem',
      letterSpacing: '0.1em',
      padding: '0.65rem 1.5rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'all 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      userSelect: 'none',
    },
    ghost: {
      background: 'transparent',
      border: '1px solid transparent',
      color: 'var(--text2)',
      fontFamily: 'var(--mono)',
      fontSize: '0.75rem',
      letterSpacing: '0.08em',
      padding: '0.65rem 1.5rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'all 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      userSelect: 'none',
    },
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{ ...styles[variant], ...style }}
      className={className}
    >
      {children}
    </button>
  );
}

// ── Badge ──────────────────────────────────────────────
export function Badge({ children, color = 'var(--cyan)' }) {
  return (
    <span style={{
      fontFamily: 'var(--mono)',
      fontSize: '0.6rem',
      letterSpacing: '0.12em',
      padding: '0.2rem 0.6rem',
      border: `1px solid ${color}`,
      color,
      background: `${color}12`,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

// ── SectionHeader ──────────────────────────────────────
export function SectionHeader({ num, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--cyan)', letterSpacing: '0.15em' }}>
        {num} //
      </span>
      <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
        {title}
      </h2>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--border2), transparent)' }} />
    </div>
  );
}

// ── Spinner ────────────────────────────────────────────
export function Spinner({ size = 16, color = 'var(--cyan)' }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      className="animate-spin"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}

// ── ProgressBar ────────────────────────────────────────
export function ProgressBar({ value, max, color = 'var(--cyan)' }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ width: '100%' }}>
      <div style={{
        height: '4px',
        background: 'var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: `${pct}%`,
          background: color,
          transition: 'width 0.4s ease',
          boxShadow: `0 0 8px ${color}`,
        }} />
      </div>
    </div>
  );
}

// ── MonoLabel ──────────────────────────────────────────
export function MonoLabel({ children, color = 'var(--text3)' }) {
  return (
    <span style={{
      fontFamily: 'var(--mono)',
      fontSize: '0.65rem',
      letterSpacing: '0.15em',
      color,
      textTransform: 'uppercase',
    }}>
      {children}
    </span>
  );
}
