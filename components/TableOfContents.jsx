'use client';

import { useState, useEffect } from 'react';

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav style={{
      position: 'sticky',
      top: '80px',
      padding: '16px 0',
      borderLeft: '2px solid var(--border)',
      paddingLeft: '16px',
    }}>
      <p style={{
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: '12px',
      }}>
        On this page
      </p>
      {headings.map((heading) => (
        
          key={heading.id}
          href={`#${heading.id}`}
          style={{
            display: 'block',
            fontSize: '13px',
            color: activeId === heading.id ? 'var(--accent)' : 'var(--text-muted)',
            fontWeight: activeId === heading.id ? '600' : '400',
            paddingLeft: heading.level === 3 ? '12px' : '0',
            marginBottom: '8px',
            transition: 'color 0.2s',
            textDecoration: 'none',
          }}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}