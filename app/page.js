import Container from '../components/Container';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function Home() {
  return (
    <Container>

      {/* Intro */}
      <Section>
        <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>
          Hey, I'm Natsu 👋
        </h1>
        <p style={{ fontSize: '18px', color: '#555', maxWidth: '540px' }}>
          I'm learning to build things on the web. This is my space to document
          projects, write about what I'm learning, and grow in public.
        </p>
      </Section>

      {/* Featured Projects */}
      <Section>
        <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '24px' }}>
          Projects
        </h2>
        {projects
          .filter((p) => p.featured)
          .map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))
        }
      </Section>

      {/* Recent Blog Posts - dummy for now */}
      <Section>
        <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '24px' }}>
          Recent Posts
        </h2>
        <p style={{ color: '#888' }}>Blog posts coming soon...</p>
      </Section>

    </Container>
  );
}