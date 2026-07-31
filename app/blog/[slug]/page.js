import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '../../../components/Container';
import Section from '../../../components/Section';
import ReadingProgress from '../../../components/ReadingProgress';
import TableOfContents from '../../../components/TableOfContents';
import { getPostBySlug, getAllPosts } from '../../../lib/posts';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: 'Post not found' };

  return {
    title: `${post.title} | Nitheesh Prahalath`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: 'Nitheesh Prahalath | Portfolio',
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      {post.headings.length > 0 && (
        <TableOfContents headings={post.headings} />
      )}
      <Container>
        <Section>
          <Link href="/blog" style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'inline-block', marginBottom: '32px' }}>
            ← Back to Blog
          </Link>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            {post.date} · {post.readingTime}
          </p>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px', color: 'var(--text-primary)' }}>
            {post.title}
          </h1>
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '32px' }}>
              {post.tags.map((tag) => (
                <span key={tag} style={{
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '3px 12px',
                  borderRadius: '999px',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            style={{ lineHeight: '1.8', fontSize: '16px', color: 'var(--text-secondary)' }}
          />
        </Section>
      </Container>
    </>
  );
}