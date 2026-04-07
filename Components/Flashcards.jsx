import React, { useState, useEffect } from 'react';
import { FLASHCARDS, DOMAINS } from '../data/secplus.js';
import { Button, Panel, Badge, MonoLabel, ProgressBar } from './UI.jsx';

export default function Flashcards({ setProgress }) {
  const [domainFilter, setDomainFilter] = useState('all');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState(new Set());

  const filtered = domainFilter === 'all'
    ? FLASHCARDS
    : FLASHCARDS.filter(f => f.domain === domainFilter);

  const card = filtered[index];

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [domainFilter]);

  useEffect(() => {
    setProgress(p => ({ ...p, cardsReviewed: mastered.size }));
  }, [mastered, setProgress]);

  const go = (dir) => {
    setFlipped(false);
    setTimeout(() => {
      setIndex(i => (i + dir + filtered.length) % filtered.length);
    }, 120);
  };

  const toggleMastered = () => {
    setMastered(prev => {
      const next = new Set(prev);
      next.has(card.id) ? next.delete(card.id) : next.add(card.id);
      return next;
    });
  };

  const domain = DOMAINS.find(d => d.id === card?.domain);

  return (
    <div style={{ padding: '5rem 2rem 4rem', maxWidth: '900px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <MonoLabel color="var(--cyan)">02 //</MonoLabel>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
          FLASHCARDS
        </h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--border2), transparent)' }} />
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--green)' }}>
          {mastered.size}/{filtered.length} MASTERED
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <ProgressBar value={mastered.size} max={filtered.length} color="var(--green)" />
      </div>

      {/* Domain filter */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button
          onClick={() => setDomainFilter('all')}
          style={{
            fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.08em',
            padding: '0.3rem 0.75rem',
            border: `1px solid ${domainFilter === 'all' ? 'var(--cyan)' : 'var(--border)'}`,
            color: domainFilter === 'all' ? 'var(--cyan)' : 'var(--text3)',
            background: domainFilter === 'all' ? 'rgba(0,212,255,0.06)' : 'transparent',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          ALL
        </button>
        {DOMAINS.map(d => (
          <button
            key={d.id}
            onClick={() => setDomainFilter(d.id)}
            style={{
              fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.08em',
              padding: '0.3rem 0.75rem',
              border: `1px solid ${domainFilter === d.id ? d.color : 'var(--border)'}`,
              color: domainFilter === d.id ? d.color : 'var(--text3)',
              background: domainFilter === d.id ? `${d.color}12` : 'transparent',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {d.code}
          </button>
        ))}
      </div>

      {/* Card */}
      {card && (
        <div style={{ marginBottom: '1.5rem' }}>
          {/* Card counter */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '0.75rem',
          }}>
            <MonoLabel>{index + 1} / {filtered.length}</MonoLabel>
            {domain && <Badge color={domain.color}>DOMAIN {domain.code}</Badge>}
          </div>

          {/* Flip card */}
          <div
            onClick={() => setFlipped(f => !f)}
            style={{
              cursor: 'pointer',
              minHeight: '260px',
              background: flipped ? 'var(--panel2)' : 'var(--panel)',
              border: `1px solid ${mastered.has(card.id) ? 'var(--green)' : flipped ? 'var(--border2)' : 'var(--border)'}`,
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'all 0.25s',
              position: 'relative',
              userSelect: 'none',
              boxShadow: mastered.has(card.id) ? '0 0 20px rgba(0,255,136,0.08)' : 'none',
            }}
          >
            {/* Top indicator */}
            <div style={{
              position: 'absolute', top: '1rem', left: '1rem',
              fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--text3)', letterSpacing: '0.15em',
            }}>
              {flipped ? 'DEFINITION' : 'TERM — CLICK TO FLIP'}
            </div>

            {mastered.has(card.id) && (
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--green)',
              }}>
                ✓ MASTERED
              </div>
            )}

            {!flipped ? (
              <div style={{
                fontFamily: 'var(--display)',
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                fontWeight: 700,
                color: 'var(--cyan)',
                letterSpacing: '0.05em',
              }}>
                {card.term}
              </div>
            ) : (
              <div style={{
                fontFamily: 'var(--body)',
                fontSize: '1.05rem',
                color: 'var(--text)',
                lineHeight: 1.8,
                maxWidth: '600px',
              }}>
                {card.definition}
              </div>
            )}
          </div>

          {/* Card controls */}
          <div style={{
            display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center',
          }}>
            <Button variant="secondary" onClick={() => go(-1)}>← PREV</Button>
            <Button
              variant={mastered.has(card.id) ? 'secondary' : 'green'}
              onClick={toggleMastered}
            >
              {mastered.has(card.id) ? 'UNMARK' : '✓ MARK MASTERED'}
            </Button>
            <Button variant="secondary" onClick={() => go(1)}>NEXT →</Button>
          </div>
        </div>
      )}

      {/* All mastered state */}
      {mastered.size === filtered.length && filtered.length > 0 && (
        <div style={{
          textAlign: 'center', padding: '2rem',
          border: '1px solid var(--green)',
          background: 'rgba(0,255,136,0.04)',
          fontFamily: 'var(--mono)', color: 'var(--green)',
          fontSize: '0.8rem', letterSpacing: '0.1em',
        }}>
          ✓ ALL {filtered.length} CARDS MASTERED — MOVE ON TO THE QUIZ
        </div>
      )}
    </div>
  );
}
