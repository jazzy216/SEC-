import { useState, useCallback } from 'react';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export function useClaudeAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callClaude = useCallback(async ({ systemPrompt, messages, maxTokens = 1000 }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: maxTokens,
          system: systemPrompt,
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.content?.find(b => b.type === 'text')?.text ?? '';
      return text;
    } catch (err) {
      const msg = err.message || 'Failed to reach AI tutor. Please try again.';
      setError(msg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { callClaude, isLoading, error };
}
