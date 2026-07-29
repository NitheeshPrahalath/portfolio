import Container from '../components/Container';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';
import { projects } from '../data/projects';
import { getAllPosts } from '../lib/posts';
import Link from 'next/link';

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <Container>

      {/* Hero */}
      <Section>
        <div style={{
          display: 'inline-block',
          background: 'var(--accent-light)',
          color: 'var(--accent)',
          fontSize: '12px',
          fontWeight: '600',
          padding: '4px 12px',
          borderRadius: '999px',
          marginBottom: '16px',
        }}>
          Learning in public
        </div>
        <h1 className="fade-up fade-up-2" style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
          Hey, I'm <span style={{ color: 'var(--accent)' }}>Nitheesh Prahalath</span> 👋
        </h1>
        <p className="fade-up fade-up-3" style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '540px', marginBottom: '28px' }}>
          I'm learning to build things on the web. This is my space to document
          projects, write about what I'm learning, and grow in public.
        </p>
        <div className="fade-up fade-up-4" style={{ display: 'flex', gap: '12px' }}>
          <Link href="/projects" style={{
            background: 'var(--accent)',
            color: '#fff',
            padding: '10px 22px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
          }}>
            View Projects
          </Link>
          <Link href="/blog" style={{
            background: 'var(--accent-light)',
            color: 'var(--accent)',
            padding: '10px 22px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
          }}>
            Read Blog →
          </Link>
        </div>
      </Section>

      {/* Featured Projects */}
      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)' }}>Projects</h2>
          <Link href="/projects" style={{ fontSize: '14px', color: 'var(--accent)' }}>View all →</Link>
        </div>
        {projects.filter((p) => p.featured).map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </Section>

      {/* Recent Blog Posts */}
      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)' }}>Recent Posts</h2>
          <Link href="/blog" style={{ fontSize: '14px', color: 'var(--accent)' }}>View all →</Link>
        </div>
        {recentPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </Section>
    </Container>
  );
}