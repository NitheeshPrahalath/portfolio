import Link from 'next/link';
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
  return {
    title: `${post.title} | Nitheesh Prahalath`,
    description: post.description,
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <>
      <ReadingProgress />
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

          {/* Two column layout — content + TOC */}
          <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>

            {/* Main content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                style={{ lineHeight: '1.8', fontSize: '16px', color: 'var(--text-secondary)' }}
              />
            </div>

            {/* Table of contents — only show if there are headings */}
            {post.headings.length > 0 && (
              <div style={{ width: '180px', flexShrink: 0 }}>
                <TableOfContents headings={post.headings} />
              </div>
            )}

          </div>
        </Section>
      </Container>
    </>
  );
}