import Container from '../../components/Container';
import Section from '../../components/Section';

export default function BlogLoading() {
  return (
    <Container>
      <Section>
        <div style={{
          height: '36px',
          width: '120px',
          background: 'var(--border)',
          borderRadius: '8px',
          marginBottom: '12px',
          animation: 'pulse 1.5s ease infinite',
        }} />
        <div style={{
          height: '16px',
          width: '240px',
          background: 'var(--border)',
          borderRadius: '8px',
          marginBottom: '40px',
          animation: 'pulse 1.5s ease infinite',
        }} />
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ marginBottom: '32px' }}>
            <div style={{ height: '13px', width: '100px', background: 'var(--border)', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 1.5s ease infinite' }} />
            <div style={{ height: '20px', width: '300px', background: 'var(--border)', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 1.5s ease infinite' }} />
            <div style={{ height: '14px', width: '220px', background: 'var(--border)', borderRadius: '4px', animation: 'pulse 1.5s ease infinite' }} />
          </div>
        ))}
      </Section>
    </Container>
  );
}
