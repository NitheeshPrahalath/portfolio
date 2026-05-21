import Container from '../components/Container';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';
import { projects } from '../data/projects';
import { getAllPosts } from '../lib/posts';

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600' }}>Projects</h2>
          <a href="/projects" style={{ fontSize: '14px', color: '#888' }}>View all →</a>
        </div>
        {projects
          .filter((p) => p.featured)
          .map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
      </Section>

      {/* Recent Blog Posts */}
      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600' }}>Recent Posts</h2>
          <a href="/blog" style={{ fontSize: '14px', color: '#888' }}>View all →</a>
        </div>
        {recentPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </Section>

    </Container>
  );
}