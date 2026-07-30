import Container from '../../components/Container';
import Section from '../../components/Section';
import BlogList from '../../components/BlogList';
import { getAllPosts } from '../../lib/posts';

export const metadata = {
  title: 'Blog | Nitheesh Prahalath',
  description: 'Writing about what I learn',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container>
      <Section>
        <h1 className="fade-up fade-up-1" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
          Blog
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
          Writing about what I'm learning, one post at a time.
        </p>
        <BlogList posts={posts} />
      </Section>
    </Container>
  );
}