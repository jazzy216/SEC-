import React from 'react';
import { DOMAINS, FLASHCARDS, QUIZ_QUESTIONS } from '../data/secplus.js';
import { Panel, Badge, ProgressBar, MonoLabel } from './UI.jsx';

export default function Dashboard({ setView, progress }) {
  const totalCards = FLASHCARDS.length;
  const totalQuestions = QUIZ_QUESTIONS.length;

  return (
    <div style={{ padding: '5rem 2rem 4rem', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Hero */}
      <div style={{ marginBottom: '3rem', animation: 'fadeUp 0.5s ease forwards' }}>
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.7rem',
          color: 'var(--green)',
          letterSpacing: '0.2em',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <span style={{ display: 'inline-block', width: '30px', height: '1px', background: 'var(--green)' }} />
          COMPTIA SECURITY+ SY0-701
        </div>
        <h1 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          color: '#fff',
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
          marginBottom: '1rem',
        }}>
          SEC<span style={{ color: 'var(--cyan)' }}>+</span> LAB
        </h1>
        <p style={{
          fontFamily: 'var(--body)',
          fontSize: '1.05rem',
          color: 'var(--text2)',
          maxWidth: '520px',
          lineHeight: 1.8,
          marginBottom: '2rem',
        }}>
          Flashcards, practice quizzes, and an AI tutor — all aligned with the SY0-701 exam objectives. Built for field technicians transitioning into security.
        </p>

        {/* Quick action buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {[
            { label: 'FLASHCARDS', view: 'flashcards', color: 'var(--cyan)' },
            { label: 'TAKE QUIZ', view: 'quiz', color: 'var(--green)' },
            { label: 'AI TUTOR', view: 'tutor', color: 'var(--purple)' },
            { label: 'GENERATE QUESTIONS', view: 'generator', color: 'var(--amber)' },
          ].map(btn => (
            <button
              key={btn.view}
              onClick={() => setView(btn.view)}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                padding: '0.65rem 1.4rem',
                border: `1px solid ${btn.color}`,
                color: btn.color,
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${btn.color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1px',
        background: 'var(--border)',
        border: '1px solid var(--border)',
        marginBottom: '2.5rem',
      }}>
        {[
          { label: 'EXAM DOMAINS', val: '5', color: 'var(--cyan)' },
          { label: 'FLASHCARDS', val: totalCards, color: 'var(--green)' },
          { label: 'QUIZ QUESTIONS', val: totalQuestions, color: 'var(--amber)' },
          { label: 'BEST SCORE', val: progress.quizScore !== null ? `${progress.quizScore}%` : '—', color: 'var(--purple)' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--panel)', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: '2rem', fontWeight: 900, color: s.color, marginBottom: '0.25rem' }}>
              {s.val}
            </div>
            <MonoLabel>{s.label}</MonoLabel>
          </div>
        ))}
      </div>

      {/* Domains */}
      <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <MonoLabel color="var(--cyan)">01 //</MonoLabel>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>EXAM DOMAINS</h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--border2), transparent)' }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1px',
        background: 'var(--border)',
        border: '1px solid var(--border)',
      }}>
        {DOMAINS.map((d) => (
          <div
            key={d.id}
            style={{
              background: 'var(--panel)',
              padding: '1.5rem',
              borderTop: `2px solid ${d.color}`,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--panel2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--panel)'; }}
            onClick={() => setView('flashcards')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <MonoLabel color="var(--text3)">DOMAIN {d.code}</MonoLabel>
              <Badge color={d.color}>{d.weight}</Badge>
            </div>
            <h3 style={{
              fontFamily: 'var(--display)',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.03em',
              marginBottom: '0.75rem',
            }}>
              {d.title}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {d.topics.map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.6rem',
                  color: 'var(--text3)',
                  border: '1px solid var(--border)',
                  padding: '0.15rem 0.5rem',
                  letterSpacing: '0.05em',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
