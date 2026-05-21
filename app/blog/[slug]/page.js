import Link from 'next/link';
import Container from '../../../components/Container';
import Section from '../../../components/Section';
import { getPostBySlug, getAllPosts } from '../../../lib/posts';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: `${post.title} | Natsu`,
    description: post.description,
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <Container>
      <Section>
        <Link href="/blog" style={{ fontSize: '14px', color: '#888', display: 'inline-block', marginBottom: '32px' }}>
          ← Back to Blog
        </Link>
        <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px' }}>
          {post.date}
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px' }}>
          {post.title}
        </h1>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          style={{ lineHeight: '1.8', fontSize: '16px' }}
        />
      </Section>
    </Container>
  );
}