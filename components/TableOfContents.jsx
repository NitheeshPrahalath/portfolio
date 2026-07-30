'use client';

import { useState, useEffect, useRef } from 'react';

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const tocRef = useRef(null);

  // Show TOC only after scrolling past the title
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track which heading is active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav
      ref={tocRef}
      style={{
        position: 'fixed',
        top: '100px',
        right: 'max(24px, calc((100vw - 760px) / 2 - 200px))',
        width: '180px',
        maxHeight: 'calc(100vh - 140px)',
        overflowY: 'auto',
        paddingLeft: '16px',
        borderLeft: '2px solid var(--border)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(8px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        scrollbarWidth: 'none',
        zIndex: 50,
      }}
    >
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
        <a
          key={heading.id}
          href={`#${heading.id}`}
          style={{
            display: 'block',
            fontSize: '13px',
            color: activeId === heading.id ? 'var(--accent)' : 'var(--text-muted)',
            fontWeight: activeId === heading.id ? '600' : '400',
            paddingLeft: heading.level === 3 ? '12px' : '0',
            marginBottom: '10px',
            transition: 'color 0.2s',
            textDecoration: 'none',
            lineHeight: '1.4',
          }}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}