'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function BlogCard({ post }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderBottom: '1px solid #dde5ff',
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform 0.2s ease',
          cursor: 'pointer',
        }}
      >
        <div>
          <p style={{ fontSize: '13px', color: '#8892b0', marginBottom: '4px' }}>{post.date}</p>
          <h3 style={{
            fontSize: '17px',
            fontWeight: '600',
            marginBottom: '6px',
            color: hovered ? '#4f6ef7' : '#1a1a2e',
            transition: 'color 0.2s',
          }}>
            {post.title}
          </h3>
          <p style={{ color: '#778', fontSize: '14px' }}>{post.description}</p>
        </div>
        <span style={{
          color: '#4f6ef7',
          fontSize: '18px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s',
          marginLeft: '16px',
          marginTop: '4px',
        }}>→</span>
      </div>
    </Link>
  );
}