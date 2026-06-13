import Container from '../../components/Container';
import Section from '../../components/Section';

export const metadata = {
  title: 'About | Nitheesh Prahalath',
  description: 'About me',
};

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Git'];

export default function AboutPage() {
  return (
    <Container>
      <Section>

        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
          About Me
        </h1>

        <p style={{ fontSize: '17px', color: '#444', marginBottom: '40px', maxWidth: '560px' }}>
          I'm Nitheesh Prahalath — a self-taught developer learning to build on the web.
          I document my progress publicly so others on the same path can find it useful.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
          Currently Learning
        </h2>
        <ul style={{ paddingLeft: '20px', color: '#555', marginBottom: '40px', lineHeight: '2' }}>
          <li>React & Next.js</li>
          <li>Building real projects from scratch</li>
          <li>Writing about what I learn</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
          Skills
        </h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {skills.map((skill) => (
            <span
              key={skill}
              style={{
                background: '#f0f0f0',
                padding: '4px 14px',
                borderRadius: '999px',
                fontSize: '14px',
                color: '#333',
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
          Find Me
        </h2>
        <div style={{ display: 'flex', gap: '20px', fontSize: '15px' }}>
          <a
            href="https://github.com/NitheeshPrahalath"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#111', borderBottom: '1px solid #ccc', paddingBottom: '2px' }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nitheesh-prahalath"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#111', borderBottom: '1px solid #ccc', paddingBottom: '2px' }}
          >
            LinkedIn
          </a>
          <a
            href="/Nitheesh_Prahalath_Updated_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#111', borderBottom: '1px solid #ccc', paddingBottom: '2px' }}
          >
            Resume ↓
          </a>
        </div>

      </Section>
    </Container>
  );
}