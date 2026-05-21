import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      borderBottom: '1px solid #eee',
      padding: '16px 0',
    }}>
      <div style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link href="/" style={{ fontWeight: '600', fontSize: '18px' }}>
          Natsu
        </Link>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/blog">Blog</Link>
        </div>
      </div>
    </nav>
  );
}