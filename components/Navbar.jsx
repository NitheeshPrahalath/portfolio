'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  const linkStyle = (path) => ({
    fontSize: '15px',
    color: isActive(path) ? 'var(--accent)' : 'var(--text-muted)',
    fontWeight: isActive(path) ? '600' : '400',
    borderBottom: isActive(path) ? '2px solid var(--accent)' : '2px solid transparent',
    paddingBottom: '2px',
    transition: 'color 0.2s',
  });

  const mobileLinkStyle = (path) => ({
    display: 'block',
    fontSize: '18px',
    fontWeight: isActive(path) ? '600' : '400',
    color: isActive(path) ? 'var(--accent)' : 'var(--text-primary)',
    padding: '12px 0',
    borderBottom: '1px solid var(--border)',
    transition: 'color 0.2s',
  });

  return (
    <>
      <nav style={{
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        background: 'var(--bg)',
        zIndex: 100,
        transition: 'background 0.3s ease',
      }}>
        <div style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link href="/" style={{ fontWeight: '700', fontSize: '18px', color: 'var(--text-primary)' }}>
            Nitheesh Prahalath
          </Link>

          {/* Desktop links */}
          <div style={{ gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/about" style={linkStyle('/about')}>About</Link>
            <Link href="/projects" style={linkStyle('/projects')}>Projects</Link>
            <Link href="/blog" style={linkStyle('/blog')}>Blog</Link>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-palette'))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '5px 10px',
                cursor: 'pointer',
                fontSize: '12px',
                color: 'var(--text-muted)',
              }}
              aria-label="Open command palette"
            >
              <span>Search</span>
              <kbd style={{
                fontSize: '11px',
                background: 'var(--accent-light)',
                color: 'var(--accent)',
                padding: '1px 6px',
                borderRadius: '4px',
              }}>⌘K</kbd>
            </button>
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                style={{
                  background: 'var(--bg)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: 'var(--accent)',
                  transition: 'background 0.2s',
                }}
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            )}
          </div>

          {/* Mobile controls */}
          <div style={{ gap: '12px', alignItems: 'center' }} className="mobile-nav">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                style={{
                  background: 'var(--bg)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: 'var(--accent)',
                }}
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: 'var(--text-primary)',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'var(--bg)',
        zIndex: 99,
        padding: '80px 32px 32px',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
      }}>
        <Link href="/" style={mobileLinkStyle('/')}>Home</Link>
        <Link href="/about" style={mobileLinkStyle('/about')}>About</Link>
        <Link href="/projects" style={mobileLinkStyle('/projects')}>Projects</Link>
        <Link href="/blog" style={mobileLinkStyle('/blog')}>Blog</Link>
      </div>

      {/* Hide/show via CSS */}
      <style>{`
        .desktop-nav { display: flex; }
        .mobile-nav { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .mobile-nav { display: flex; }
        }
      `}</style>
    </>
  );
}