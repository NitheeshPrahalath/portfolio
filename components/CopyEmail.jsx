'use client';

import { useState } from 'react';

export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Could not copy. Please copy manually: ' + email);
    }
  };

  return (
    <button
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={copied ? 'Copied!' : 'Copy Email'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minWidth: copied || hovered ? '120px' : '42px',
        height: '42px',
        padding: copied || hovered ? '0 16px' : '0',
        background: copied ? 'var(--accent)' : 'var(--bg-card)',
        color: copied ? '#fff' : 'var(--accent)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {copied ? '✓ Copied!' : hovered ? '📋 Copy Email' : '📋'}
    </button>
  );
}
