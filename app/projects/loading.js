import Container from '../../components/Container';
import Section from '../../components/Section';

export default function ProjectsLoading() {
  return (
    <Container>
      <Section>
        <div style={{
          height: '36px',
          width: '140px',
          background: 'var(--border)',
          borderRadius: '8px',
          marginBottom: '12px',
          animation: 'pulse 1.5s ease infinite',
        }} />
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '24px',
            marginBottom: '16px',
          }}>
            <div style={{ height: '20px', width: '200px', background: 'var(--border)', borderRadius: '4px', marginBottom: '10px', animation: 'pulse 1.5s ease infinite' }} />
            <div style={{ height: '14px', width: '300px', background: 'var(--border)', borderRadius: '4px', marginBottom: '14px', animation: 'pulse 1.5s ease infinite' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2].map((j) => (
                <div key={j} style={{ height: '22px', width: '60px', background: 'var(--border)', borderRadius: '999px', animation: 'pulse 1.5s ease infinite' }} />
              ))}
            </div>
          </div>
        ))}
      </Section>
    </Container>
  );
}
