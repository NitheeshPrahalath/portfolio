import Link from 'next/link';
import Container from '../components/Container';
import Section from '../components/Section';

export default function NotFound() {
  return (
    <Container>
      <Section>
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
          404
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          This page doesn&apos;t exist.
        </p>
        <Link href="/" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>
          Go home →
        </Link>
      </Section>
    </Container>
  );
}