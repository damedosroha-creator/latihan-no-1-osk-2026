import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * Splits prose containing $$...$$ (display) and $...$ (inline) math tokens
 * and renders each math token via KaTeX into clean textbook typography.
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const tokens: Array<{ type: 'text' | 'inline' | 'display'; content: string }> = [];
  const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    if (raw.startsWith('$$')) {
      tokens.push({ type: 'display', content: raw.slice(2, -2).trim() });
    } else {
      tokens.push({ type: 'inline', content: raw.slice(1, -1).trim() });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return (
    <span className={className}>
      {tokens.map((tok, idx) => {
        if (tok.type === 'text') {
          return <React.Fragment key={idx}>{tok.content}</React.Fragment>;
        }
        try {
          const html = katex.renderToString(tok.content, {
            displayMode: tok.type === 'display',
            throwOnError: false,
            strict: false,
          });
          if (tok.type === 'display') {
            return (
              <span
                key={idx}
                className="block my-2 overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }
          return (
            <span
              key={idx}
              className="inline-block align-baseline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <code key={idx}>{tok.content}</code>;
        }
      })}
    </span>
  );
};
