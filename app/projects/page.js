import Container from '../../components/Container';
import Section from '../../components/Section';
import ProjectList from '../../components/ProjectList';
import { projects } from '../../data/projects';

export const metadata = {
  title: 'Projects | Nitheesh Prahalath',
  description: 'Things I have built',
};

export default function ProjectsPage() {
  return (
    <Container>
      <Section>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
          Projects
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
          Things I've built while learning.
        </p>
        <ProjectList projects={projects} />
      </Section>
    </Container>
  );
}