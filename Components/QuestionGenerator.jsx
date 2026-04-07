import React, { useState } from 'react';
import { useClaudeAI } from '../hooks/useClaudeAI.js';
import { DOMAINS } from '../data/secplus.js';
import { Button, Badge, MonoLabel, Spinner } from './UI.jsx';

const SYSTEM_PROMPT = `You are an expert CompTIA Security+ (SY0-701) exam question writer.

Generate realistic Security+ multiple-choice questions that match the actual exam format and difficulty.

ALWAYS respond with valid JSON only — no markdown, no backticks, no explanation outside the JSON. Format:
{
  "question": "...",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "answerIndex": 0,
  "explanation": "...",
  "topic": "..."
}

Rules:
- Questions should be scenario-based where possible ("A security analyst notices...", "A company wants to...")
- Wrong answers (distractors) should be plausible, not obviously wrong
- Explanation should be 2-3 sentences, clear and educational
- Difficulty should vary between 2-4 out of 5
- Focus on practical application, not just definitions
- Healthcare/enterprise IT context makes great scenarios`;

export default function QuestionGenerator() {
  const [domain, setDomain] = useState('any');
  const [difficulty, setDifficulty] = useState('mixed');
  const [generated, setGenerated] = useState([]);
  const [selected, setSelected] = useState({});
  const [revealed, setRevealed] = useState({});
  const { callClaude, isLoading } = useClaudeAI();
  const [error, setError] = useState(null);

  const generate = async () => {
    setError(null);
    const domainInfo = domain === 'any'
      ? 'any Security+ SY0-701 domain'
      : DOMAINS.find(d => d.id === domain)?.title;

    const diff = difficulty === 'mixed' ? 'mixed difficulty' : `${difficulty} difficulty`;

    const prompt = `Generate a ${diff} Security+ SY0-701 exam question from the domain: ${domainInfo}. 
${difficulty === 'hard' ? 'Make it scenario-based and tricky — the kind that trips people up on the real exam.' : ''}
${difficulty === 'easy' ? 'Make it straightforward — good for building confidence on core concepts.' : ''}
Return ONLY the JSON object, nothing else.`;

    const reply = await callClaude({
      systemPrompt: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 600,
    });

    if (!reply) { setError('Failed to generate question. Try again.'); return; }

    try {
      const clean = reply.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      const id = `gen-${Date.now()}`;
      setGenerated(prev => [{ ...parsed, id, domainId: domain }, ...prev]);
    } catch {
      setError('AI returned malformed response. Try again.');
    }
  };

  const handleSelect = (id, optIndex, answerIndex) => {
    if (revealed[id]) return;
    setSelected(prev => ({ ...prev, [id]: optIndex }));
    setRevealed(prev => ({ ...prev, [id]: true }));
  };

  const domainForCard = (domainId) => domainId === 'any' ? null : DOMAINS.find(d => d.id === domainId);

  return (
    <div style={{ padding: '5rem 2rem 4rem', maxWidth: '900px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <MonoLabel color="var(--cyan)">05 //</MonoLabel>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
          QUESTION GENERATOR
        </h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--border2), transparent)' }} />
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end',
        padding: '1.5rem',
        background: 'var(--panel)',
        border: '1px solid var(--border)',
        marginBottom: '2rem',
      }}>
        {/* Domain picker */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <MonoLabel>DOMAIN</MonoLabel>
          <select
            value={domain}
            onChange={e => setDomain(e.target.value)}
            style={{
              display: 'block',
              marginTop: '0.5rem',
              width: '100%',
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'var(--mono)',
              fontSize: '0.75rem',
              padding: '0.6rem 0.75rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="any">ANY DOMAIN</option>
            {DOMAINS.map(d => (
              <option key={d.id} value={d.id}>{d.code} — {d.title}</option>
            ))}
          </select>
        </div>

        {/* Difficulty picker */}
        <div style={{ flex: '1', minWidth: '160px' }}>
          <MonoLabel>DIFFICULTY</MonoLabel>
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
            {['easy', 'mixed', 'hard'].map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                style={{
                  flex: 1,
                  fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.08em',
                  padding: '0.55rem 0.5rem',
                  border: `1px solid ${difficulty === d ? 'var(--cyan)' : 'var(--border)'}`,
                  color: difficulty === d ? 'var(--cyan)' : 'var(--text3)',
                  background: difficulty === d ? 'rgba(0,212,255,0.06)' : 'transparent',
                  cursor: 'pointer', transition: 'all 0.2s',
                  textTransform: 'uppercase',
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <Button variant="primary" onClick={generate} disabled={isLoading} style={{ flexShrink: 0, alignSelf: 'flex-end' }}>
          {isLoading ? <><Spinner size={13} /> GENERATING...</> : '⚡ GENERATE QUESTION'}
        </Button>
      </div>

      {error && (
        <div style={{
          fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--red)',
          border: '1px solid var(--red)', padding: '0.75rem 1rem',
          background: 'rgba(255,51,85,0.04)', marginBottom: '1.5rem',
        }}>
          ERROR: {error}
        </div>
      )}

      {generated.length === 0 && !isLoading && (
        <div style={{
          textAlign: 'center', padding: '4rem 2rem',
          border: '1px solid var(--border)',
          background: 'var(--panel)',
        }}>
          <div style={{ fontFamily: 'var(--display)', fontSize: '0.9rem', color: 'var(--text3)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            NO QUESTIONS GENERATED YET
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text3)' }}>
            Select a domain and difficulty, then click Generate
          </div>
        </div>
      )}

      {/* Generated questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {generated.map((q, qi) => {
          const dom = domainForCard(q.domainId);
          const isRevealed = revealed[q.id];
          const userSel = selected[q.id];

          return (
            <div key={q.id} style={{
              background: 'var(--panel)',
              border: '1px solid var(--border)',
              padding: '1.75rem',
              animation: qi === 0 ? 'fadeUp 0.4s ease forwards' : 'none',
            }}>
              {/* Meta */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {dom && <Badge color={dom.color}>DOMAIN {dom.code}</Badge>}
                {q.topic && <Badge color="var(--text3)">{q.topic}</Badge>}
                <Badge color="var(--purple)">AI GENERATED</Badge>
              </div>

              {/* Question */}
              <div style={{
                fontFamily: 'var(--body)', fontSize: '1.05rem', fontWeight: 600,
                color: '#fff', lineHeight: 1.7, marginBottom: '1.25rem',
              }}>
                {q.question}
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                {q.options.map((opt, i) => {
                  let borderColor = 'var(--border)';
                  let color = 'var(--text)';
                  let bg = 'transparent';

                  if (isRevealed) {
                    if (i === q.answerIndex) { borderColor = 'var(--green)'; color = 'var(--green)'; bg = 'rgba(0,255,136,0.04)'; }
                    else if (i === userSel) { borderColor = 'var(--red)'; color = 'var(--red)'; bg = 'rgba(255,51,85,0.04)'; }
                    else { color = 'var(--text3)'; }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(q.id, i, q.answerIndex)}
                      disabled={isRevealed}
                      style={{
                        textAlign: 'left', padding: '0.75rem 1rem',
                        border: `1px solid ${borderColor}`,
                        background: bg, color,
                        fontFamily: 'var(--body)', fontSize: '0.95rem',
                        cursor: isRevealed ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { if (!isRevealed) e.currentTarget.style.borderColor = 'var(--border2)'; }}
                      onMouseLeave={e => { if (!isRevealed) e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isRevealed && (
                <div style={{
                  padding: '1rem 1.25rem',
                  background: 'var(--panel2)',
                  border: '1px solid var(--border2)',
                  borderLeft: '3px solid var(--amber)',
                  animation: 'fadeUp 0.3s ease forwards',
                }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>
                    // EXPLANATION
                  </div>
                  <div style={{ fontFamily: 'var(--body)', fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.8 }}>
                    {q.explanation}
                  </div>
                </div>
              )}

              {!isRevealed && (
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text3)', letterSpacing: '0.08em' }}>
                  SELECT AN ANSWER TO REVEAL EXPLANATION
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
