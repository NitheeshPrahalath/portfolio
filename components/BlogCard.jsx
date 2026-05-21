import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div style={{
        borderBottom: '1px solid #eee',
        padding: '20px 0',
        cursor: 'pointer',
      }}>
        <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '4px' }}>
          {post.date}
        </p>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '6px' }}>
          {post.title}
        </h3>
        <p style={{ color: '#666', fontSize: '15px' }}>
          {post.description}
        </p>
      </div>
    </Link>
  );
}