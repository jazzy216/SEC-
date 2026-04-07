import React, { useState } from 'react';
import { QUIZ_QUESTIONS, DOMAINS } from '../data/secplus.js';
import { Button, Badge, MonoLabel, ProgressBar } from './UI.jsx';

export default function Quiz({ setProgress, setView }) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]); // {correct: bool}

  const q = QUIZ_QUESTIONS[qIndex];
  const domain = DOMAINS.find(d => d.id === q?.domain);

  const handleSelect = (i) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    const correct = i === q.answer;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { correct }]);
  };

  const handleNext = () => {
    if (qIndex < QUIZ_QUESTIONS.length - 1) {
      setQIndex(i => i + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      const finalScore = Math.round(((score + (selected === q.answer ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100);
      // avoid double-counting if score already updated
      const trueScore = Math.round((answers.filter(a => a.correct).length + (selected === q.answer ? 1 : 0)) / QUIZ_QUESTIONS.length * 100);
      setProgress(p => ({ ...p, quizScore: Math.max(p.quizScore ?? 0, trueScore) }));
      setFinished(true);
    }
  };

  const restart = () => {
    setQIndex(0); setSelected(null); setRevealed(false);
    setScore(0); setFinished(false); setAnswers([]);
  };

  // ── Results screen ───────────────────────────────────
  if (finished) {
    const totalCorrect = answers.filter(a => a.correct).length;
    const pct = Math.round((totalCorrect / QUIZ_QUESTIONS.length) * 100);
    const passed = pct >= 75;

    return (
      <div style={{ padding: '5rem 2rem 4rem', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          border: `1px solid ${passed ? 'var(--green)' : 'var(--red)'}`,
          padding: '3rem 2rem',
          background: passed ? 'rgba(0,255,136,0.03)' : 'rgba(255,51,85,0.03)',
          marginBottom: '2rem',
        }}>
          <div style={{
            fontFamily: 'var(--display)',
            fontSize: '4rem',
            fontWeight: 900,
            color: passed ? 'var(--green)' : 'var(--red)',
            marginBottom: '0.5rem',
          }}>
            {pct}%
          </div>
          <div style={{ fontFamily: 'var(--display)', fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>
            {passed ? 'STRONG RESULT' : 'KEEP STUDYING'}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text2)' }}>
            {totalCorrect} / {QUIZ_QUESTIONS.length} CORRECT
          </div>
        </div>

        {/* Per-question breakdown */}
        <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
          {QUIZ_QUESTIONS.map((q, i) => (
            <div key={q.id} style={{
              display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
              padding: '0.75rem 1rem',
              background: 'var(--panel)',
              borderLeft: `2px solid ${answers[i]?.correct ? 'var(--green)' : 'var(--red)'}`,
              marginBottom: '1px',
            }}>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '0.7rem',
                color: answers[i]?.correct ? 'var(--green)' : 'var(--red)',
                flexShrink: 0, marginTop: '2px',
              }}>
                {answers[i]?.correct ? '✓' : '✗'}
              </span>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text3)', marginBottom: '0.2rem' }}>
                  Q{i + 1} · {q.topic}
                </div>
                <div style={{ fontFamily: 'var(--body)', fontSize: '0.85rem', color: 'var(--text2)' }}>
                  {q.question}
                </div>
                {!answers[i]?.correct && (
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--green)', marginTop: '0.25rem' }}>
                    ✓ {q.options[q.answer]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={restart}>RETAKE QUIZ</Button>
          <Button variant="secondary" onClick={() => setView('generator')}>GENERATE MORE QUESTIONS</Button>
        </div>
      </div>
    );
  }

  // ── Quiz screen ──────────────────────────────────────
  return (
    <div style={{ padding: '5rem 2rem 4rem', maxWidth: '800px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <MonoLabel color="var(--cyan)">03 //</MonoLabel>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
          KNOWLEDGE CHECK
        </h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--border2), transparent)' }} />
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <MonoLabel>QUESTION {qIndex + 1} OF {QUIZ_QUESTIONS.length}</MonoLabel>
        {domain && <Badge color={domain.color}>DOMAIN {domain.code}</Badge>}
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <ProgressBar value={qIndex + 1} max={QUIZ_QUESTIONS.length} color="var(--cyan)" />
      </div>

      {/* Topic */}
      <div style={{ marginBottom: '1rem' }}>
        <MonoLabel color="var(--text3)">{q.topic}</MonoLabel>
      </div>

      {/* Question */}
      <div style={{
        fontFamily: 'var(--body)',
        fontSize: '1.15rem',
        fontWeight: 600,
        color: '#fff',
        lineHeight: 1.7,
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'var(--panel)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--cyan)',
      }}>
        {q.question}
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {q.options.map((opt, i) => {
          let borderColor = 'var(--border)';
          let color = 'var(--text)';
          let bg = 'var(--panel)';

          if (revealed) {
            if (i === q.answer) { borderColor = 'var(--green)'; color = 'var(--green)'; bg = 'rgba(0,255,136,0.04)'; }
            else if (i === selected) { borderColor = 'var(--red)'; color = 'var(--red)'; bg = 'rgba(255,51,85,0.04)'; }
            else { color = 'var(--text3)'; }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              style={{
                textAlign: 'left',
                padding: '1rem 1.25rem',
                border: `1px solid ${borderColor}`,
                background: bg,
                color,
                fontFamily: 'var(--body)',
                fontSize: '1rem',
                cursor: revealed ? 'default' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
              onMouseEnter={e => { if (!revealed) e.currentTarget.style.borderColor = 'var(--border2)'; }}
              onMouseLeave={e => { if (!revealed) e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.65rem',
                color: 'var(--text3)',
                width: '1.5rem',
                flexShrink: 0,
              }}>
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
              {revealed && i === q.answer && (
                <span style={{ marginLeft: 'auto', color: 'var(--green)', fontSize: '0.9rem' }}>✓</span>
              )}
              {revealed && i === selected && i !== q.answer && (
                <span style={{ marginLeft: 'auto', color: 'var(--red)', fontSize: '0.9rem' }}>✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {revealed && (
        <div style={{
          padding: '1.25rem',
          background: 'var(--panel2)',
          border: '1px solid var(--border2)',
          borderLeft: '3px solid var(--amber)',
          marginBottom: '1.5rem',
          animation: 'fadeUp 0.3s ease forwards',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
            // EXPLANATION
          </div>
          <div style={{ fontFamily: 'var(--body)', fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.8 }}>
            {q.explanation}
          </div>
        </div>
      )}

      {/* Next button */}
      {revealed && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" onClick={handleNext}>
            {qIndex < QUIZ_QUESTIONS.length - 1 ? 'NEXT QUESTION →' : 'VIEW RESULTS →'}
          </Button>
        </div>
      )}
    </div>
  );
}
