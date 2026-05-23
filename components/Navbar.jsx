'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  const linkStyle = (path) => ({
    fontSize: '15px',
    color: isActive(path) ? '#4f6ef7' : '#8892b0',
    fontWeight: isActive(path) ? '600' : '400',
    borderBottom: isActive(path) ? '2px solid #4f6ef7' : '2px solid transparent',
    paddingBottom: '2px',
    transition: 'color 0.2s',
  });

  return (
    <nav style={{
      borderBottom: '1px solid #dde5ff',
      padding: '16px 0',
      position: 'sticky',
      top: 0,
      background: '#f0f4ff',
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link href="/" style={{ fontWeight: '700', fontSize: '18px', color: '#1a1a2e' }}>
          Natsu
        </Link>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/about" style={linkStyle('/about')}>About</Link>
          <Link href="/projects" style={linkStyle('/projects')}>Projects</Link>
          <Link href="/blog" style={linkStyle('/blog')}>Blog</Link>
        </div>
      </div>
    </nav>
  );
}