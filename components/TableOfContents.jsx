'use client';

import { useState, useEffect } from 'react';

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const tocLinks = headings.map((heading) => (
    <a
      key={heading.id}
      href={`#${heading.id}`}
      onClick={() => setMobileOpen(false)}
      style={{
        display: 'block',
        fontSize: '13px',
        color: activeId === heading.id ? 'var(--accent)' : 'var(--text-muted)',
        fontWeight: activeId === heading.id ? '600' : '400',
        paddingLeft: heading.level === 1 ? '0' : heading.level === 2 ? '12px' : '24px',
        marginBottom: '10px',
        transition: 'color 0.2s',
        textDecoration: 'none',
        lineHeight: '1.4',
      }}
    >
      {heading.text}
    </a>
  ));

  return (
    <>
      {/* Desktop TOC — fixed sidebar */}
      <nav style={{
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
      }} className="toc-desktop">
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
        {tocLinks}
      </nav>

      {/* Mobile TOC — floating button + dropdown */}
      <div className="toc-mobile" style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 200,
      }}>
        {/* Dropdown panel */}
        {mobileOpen && (
          <div style={{
            position: 'absolute',
            bottom: '52px',
            right: 0,
            width: '220px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            maxHeight: '60vh',
            overflowY: 'auto',
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
            {tocLinks}
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(79,110,247,0.3)',
            transition: 'transform 0.2s',
            transform: mobileOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
          aria-label="Table of contents"
        >
          ☰
        </button>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="toc-mobile"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 199,
          }}
        />
      )}

      <style>{`
        .toc-desktop { display: block; }
        .toc-mobile { display: none; }
        @media (max-width: 768px) {
          .toc-desktop { display: none; }
          .toc-mobile { display: block; }
        }
      `}</style>
    </>
  );
}