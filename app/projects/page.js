import Container from '../../components/Container';
import Section from '../../components/Section';
import ProjectList from '../../components/ProjectList';
import GitHubFeed from '../../components/GitHubFeed';
import { projects } from '../../data/projects';

export const metadata = {
  title: 'Projects | Nitheesh Prahalath',
  description: 'Things I have built',
};

export default function ProjectsPage() {
  return (
    <Container>
      <Section>
        <h1 className="fade-up fade-up-1"style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
          Projects
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
          Things I&apos;ve built while learning.
        </p>
        <ProjectList projects={projects} />
      </Section>

      <Section>
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
          Recent GitHub Activity
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px' }}>
          Live from GitHub
        </p>
        <GitHubFeed username="NitheeshPrahalath" />
      </Section>
    </Container>
  );
}