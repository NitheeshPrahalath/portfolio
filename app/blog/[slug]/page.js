import Container from '../../../components/Container';
import Section from '../../../components/Section';
import { getPostBySlug, getAllPosts } from '../../../lib/posts';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    title: `${post.title} | Natsu`,
    description: post.description,
  };
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <Container>
      <Section>
        <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px' }}>
          {post.date}
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px' }}>
          {post.title}
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          style={{ lineHeight: '1.8', fontSize: '16px' }}
        />
      </Section>
    </Container>
  );
}