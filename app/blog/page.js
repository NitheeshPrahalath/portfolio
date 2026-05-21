import Container from '../../components/Container';
import Section from '../../components/Section';
import BlogCard from '../../components/BlogCard';
import { getAllPosts } from '../../lib/posts';

export const metadata = {
  title: 'Blog | Natsu',
  description: 'Writing about what I learn',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container>
      <Section>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          Blog
        </h1>
        <p style={{ color: '#888', marginBottom: '40px' }}>
          Writing about what I'm learning, one post at a time.
        </p>
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </Section>
    </Container>
  );
}