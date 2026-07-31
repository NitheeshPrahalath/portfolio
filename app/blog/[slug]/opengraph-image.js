import { ImageResponse } from 'next/og';
import { getPostBySlug } from '../../../lib/posts';

export const alt = 'Nitheesh Prahalath | Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { slug } = await params;

  let title = 'Blog post';
  try {
    const post = await getPostBySlug(slug);
    title = post.title;
  } catch {
    // post not found — fall back to a generic title
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #0b0f19 0%, #131929 100%)',
        }}
      >
        <div style={{ fontSize: 28, color: '#7b8fff', marginBottom: 24 }}>
          Nitheesh Prahalath — Blog
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...size }
  );
}
