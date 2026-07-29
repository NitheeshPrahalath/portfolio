import Container from '../../components/Container';
import Section from '../../components/Section';
import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'About | Nitheesh Prahalath',
  description: 'About me',
};

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Git'];

export default function AboutPage() {
  return (
    <Container>
      <Section>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
          About Me
        </h1>
        <p style={{ fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '560px' }}>
          I'm Natsu — a self-taught developer learning to build on the web.
          I document my progress publicly so others on the same path can find it useful.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>
          Currently Learning
        </h2>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '2' }}>
          <li>React & Next.js</li>
          <li>Building real projects from scratch</li>
          <li>Writing about what I learn</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>
          Skills
        </h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {skills.map((skill) => (
            <span key={skill} style={{
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              padding: '4px 14px',
              borderRadius: '999px',
              fontSize: '14px',
            }}>
              {skill}
            </span>
          ))}
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>
          Find Me
        </h2>
        <div style={{ display: 'flex', gap: '20px', fontSize: '15px' }}>
          <a href="https://github.com/NitheeshPrahalath" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>GitHub</a>
          <a href="https://linkedin.com/in/nitheesh-prahalath" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>LinkedIn</a>
          <a href="/Nitheesh_Prahalath_Updated_Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>Resume ↓</a>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)', marginTop: '40px' }}>
          Get In Touch
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
          Have a question or just want to say hi? Fill out the form below.
        </p>
        <ContactForm />
      </Section>
    </Container>
  );
}