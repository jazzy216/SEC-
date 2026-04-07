import React, { useState, useRef, useEffect } from 'react';
import { useClaudeAI } from '../hooks/useClaudeAI.js';
import { Button, MonoLabel, Spinner } from './UI.jsx';

const SYSTEM_PROMPT = `You are an expert Security+ (SY0-701) tutor helping an IT field service technician at Vanderbilt University Medical Center transition into cybersecurity. 

Your student has:
- CompTIA A+ and Network+ certifications
- Real-world experience with Microsoft Intune MDM, VMware Horizon VDI, PowerShell, asset management
- A home lab with GL.iNet router (OpenWrt), AdGuard, Pi-hole, ProtonVPN/WireGuard, two Dell Optiplex 3020s
- 50% complete on a WGU B.S. in Cybersecurity

Teaching style:
- Relate concepts to their healthcare IT experience when possible (e.g., VLAN segmentation = clinical device isolation they see at work)
- Be direct and concise — they have field tech instincts, not academic ones
- Use real-world examples, especially healthcare IT context
- When explaining technical concepts, use analogies to things they already know
- Keep answers focused and actionable
- Format responses clearly but don't be overly verbose
- If they ask about something outside Security+, briefly answer then redirect to how it applies to their exam/career goal

Always be encouraging — they're making a smart career move and are further along than they realize.`;

const SUGGESTED = [
  "Explain the CIA Triad like I'm a field tech",
  "What's the difference between IDS and IPS?",
  "How does hashing prove data integrity?",
  "What is Zero Trust and how does Vanderbilt probably use it?",
  "Explain incident response phases with a real example",
  "What's the hardest part of the Security+ exam?",
  "How does my Intune experience apply to security?",
  "Explain SIEM vs my AdGuard setup",
];

export default function AIChatTutor() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey — I'm your Security+ AI tutor. I know your background: field tech at Vanderbilt, A+, Network+, home lab running, halfway through your WGU degree. Ask me anything about Security+ concepts and I'll explain them in terms that actually make sense for where you're coming from.",
    }
  ]);
  const [input, setInput] = useState('');
  const { callClaude, isLoading } = useClaudeAI();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || isLoading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);

    // Build messages array for API (exclude system prompt messages)
    const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));

    const reply = await callClaude({
      systemPrompt: SYSTEM_PROMPT,
      messages: apiMessages,
      maxTokens: 1000,
    });

    if (reply) {
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } else {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error — please check your network and try again.',
      }]);
    }
  };

  return (
    <div style={{ padding: '5rem 2rem 2rem', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexShrink: 0 }}>
        <MonoLabel color="var(--cyan)">04 //</MonoLabel>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
          AI TUTOR
        </h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--border2), transparent)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s infinite' }} />
          <MonoLabel color="var(--green)">CLAUDE AI</MonoLabel>
        </div>
      </div>

      {/* Suggested prompts */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem', flexShrink: 0 }}>
        {SUGGESTED.map(s => (
          <button
            key={s}
            onClick={() => send(s)}
            disabled={isLoading}
            style={{
              fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.06em',
              padding: '0.25rem 0.65rem',
              border: '1px solid var(--border)',
              color: 'var(--text3)',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)'; }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        border: '1px solid var(--border)',
        background: 'var(--panel)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1rem',
        minHeight: 0,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
            animation: 'fadeUp 0.3s ease forwards',
          }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.12em',
              color: m.role === 'user' ? 'var(--cyan)' : 'var(--green)',
              marginBottom: '0.3rem',
            }}>
              {m.role === 'user' ? 'YOU' : 'AI TUTOR'}
            </div>
            <div style={{
              maxWidth: '80%',
              padding: '1rem 1.25rem',
              background: m.role === 'user' ? 'rgba(0,212,255,0.07)' : 'var(--panel2)',
              border: `1px solid ${m.role === 'user' ? 'var(--border2)' : 'var(--border)'}`,
              fontFamily: 'var(--body)',
              fontSize: '0.95rem',
              color: 'var(--text)',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--green)', marginBottom: '0.3rem', letterSpacing: '0.12em' }}>AI TUTOR</div>
            <div style={{
              padding: '1rem 1.25rem',
              background: 'var(--panel2)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Spinner size={14} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text3)' }}>THINKING...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Ask about any Security+ concept..."
          style={{
            flex: 1,
            background: 'var(--panel)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            fontFamily: 'var(--mono)',
            fontSize: '0.8rem',
            padding: '0.75rem 1rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
        />
        <Button variant="primary" onClick={() => send()} disabled={isLoading || !input.trim()}>
          {isLoading ? <Spinner size={14} /> : 'SEND'}
        </Button>
      </div>
    </div>
  );
}
