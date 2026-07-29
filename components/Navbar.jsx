'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  const linkStyle = (path) => ({
    fontSize: '15px',
    color: isActive(path) ? 'var(--accent)' : 'var(--text-muted)',
    fontWeight: isActive(path) ? '600' : '400',
    borderBottom: isActive(path) ? '2px solid var(--accent)' : '2px solid transparent',
    paddingBottom: '2px',
    transition: 'color 0.2s',
  });

  return (
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
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/about" style={linkStyle('/about')}>About</Link>
          <Link href="/projects" style={linkStyle('/projects')}>Projects</Link>
          <Link href="/blog" style={linkStyle('/blog')}>Blog</Link>

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
      </div>
    </nav>
  );
}