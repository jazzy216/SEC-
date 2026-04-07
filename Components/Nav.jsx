import React from 'react';

const NAV_ITEMS = [
  { id: 'dashboard', label: '// home' },
  { id: 'flashcards', label: '// flashcards' },
  { id: 'quiz', label: '// quiz' },
  { id: 'tutor', label: '// ai tutor' },
  { id: 'generator', label: '// question gen' },
];

export default function Nav({ view, setView, progress }) {
  const pct = progress.quizScore !== null ? `${progress.quizScore}%` : '—';

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      background: 'rgba(5,10,14,0.94)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      height: '56px',
      gap: '1rem',
    }}>
      {/* Logo */}
      <button
        onClick={() => setView('dashboard')}
        style={{
          fontFamily: 'var(--display)',
          fontSize: '0.8rem',
          fontWeight: 900,
          color: 'var(--cyan)',
          letterSpacing: '0.15em',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        SEC<span style={{ color: 'var(--green)' }}>+</span>LAB
      </button>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto' }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              color: view === item.id ? 'var(--cyan)' : 'var(--text3)',
              background: view === item.id ? 'rgba(0,212,255,0.06)' : 'none',
              border: 'none',
              borderBottom: view === item.id ? '1px solid var(--cyan)' : '1px solid transparent',
              cursor: 'pointer',
              padding: '0.4rem 0.75rem',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Score pill */}
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.65rem',
        color: 'var(--green)',
        border: '1px solid var(--border)',
        padding: '0.25rem 0.75rem',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        letterSpacing: '0.1em',
      }}>
        SCORE: {pct}
      </div>
    </nav>
  );
}
