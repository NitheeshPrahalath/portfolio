import Container from '../../components/Container';
import Section from '../../components/Section';
import ProjectCard from '../../components/ProjectCard';
import { projects } from '../../data/projects';

export const metadata = {
  title: 'Projects | Nitheesh Prahalath',
  description: 'Things I have built',
};

export default function ProjectsPage() {
  return (
    <Container>
      <Section>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          Projects
        </h1>
        <p style={{ color: '#888', marginBottom: '40px' }}>
          Things I've built while learning.
        </p>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </Section>
    </Container>
  );
}