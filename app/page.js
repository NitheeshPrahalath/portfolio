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
        <div className="fade-up fade-up-1" style={{
          display: 'inline-block',
          background: '#dde5ff',
          color: '#4f6ef7',
          fontSize: '12px',
          fontWeight: '600',
          padding: '4px 12px',
          borderRadius: '999px',
          marginBottom: '16px',
          letterSpacing: '0.3px',
        }}>
          Learning in public
        </div>
        <h1 className="fade-up fade-up-2" style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px', color: '#1a1a2e' }}>
          Hey, I'm <span style={{ color: '#4f6ef7' }}>Natsu</span> 👋
        </h1>
        <p className="fade-up fade-up-3" style={{ fontSize: '18px', color: '#556', maxWidth: '540px', marginBottom: '28px' }}>
          I'm learning to build things on the web. This is my space to document
          projects, write about what I'm learning, and grow in public.
        </p>
        <div className="fade-up fade-up-4" style={{ display: 'flex', gap: '12px' }}>
          <Link href="/projects" style={{
            background: '#4f6ef7',
            color: '#fff',
            padding: '10px 22px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'opacity 0.2s',
          }}>
            View Projects
          </Link>
          <Link href="/blog" style={{
            background: '#dde5ff',
            color: '#4f6ef7',
            padding: '10px 22px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'opacity 0.2s',
          }}>
            Read Blog →
          </Link>
        </div>
      </Section>

      {/* Featured Projects */}
      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a2e' }}>Projects</h2>
          <Link href="/projects" style={{ fontSize: '14px', color: '#4f6ef7' }}>View all →</Link>
        </div>
        {projects.filter((p) => p.featured).map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </Section>

      {/* Recent Blog Posts */}
      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a2e' }}>Recent Posts</h2>
          <Link href="/blog" style={{ fontSize: '14px', color: '#4f6ef7' }}>View all →</Link>
        </div>
        {recentPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </Section>

    </Container>
  );
}