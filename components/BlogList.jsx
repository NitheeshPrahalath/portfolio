'use client';

import { useState } from 'react';
import BlogCard from './BlogCard';

export default function BlogList({ posts }) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [activeTag, setActiveTag] = useState('All');

  // Build tag list dynamically
  const allTags = ['All', ...new Set(posts.flatMap((p) => p.tags || []))];

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
      const matchesTag = activeTag === 'All' || post.tags?.includes(activeTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') return a.date < b.date ? 1 : -1;
      return a.date > b.date ? 1 : -1;
    });

  return (
    <div>

      {/* Search + Sort Row */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            fontSize: '15px',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
        />
        <button onClick={() => setSortOrder('newest')} style={{
          padding: '10px 16px',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: sortOrder === 'newest' ? 'var(--accent)' : 'var(--bg-card)',
          color: sortOrder === 'newest' ? '#fff' : 'var(--text-muted)',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}>
          Newest
        </button>
        <button onClick={() => setSortOrder('oldest')} style={{
          padding: '10px 16px',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: sortOrder === 'oldest' ? 'var(--accent)' : 'var(--bg-card)',
          color: sortOrder === 'oldest' ? '#fff' : 'var(--text-muted)',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}>
          Oldest
        </button>
      </div>

      {/* Tag Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            style={{
              padding: '5px 14px',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: activeTag === tag ? 'var(--accent)' : 'var(--bg-card)',
              color: activeTag === tag ? '#fff' : 'var(--text-muted)',
              fontSize: '12px',
              fontWeight: activeTag === tag ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts */}
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))
      ) : (
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>No posts found.</p>
      )}

    </div>
  );
}