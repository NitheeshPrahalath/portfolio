'use client';

import { useState} from 'react';
import BlogCard from './BlogCard';

export default function BlogList({ posts}) {
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    ).sort((a,b) => {
        if (sortOrder === 'newest') return a.date < b.date ? 1: -1;
        return a.date > b.date ? 1: -1;
    });

    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid #dde5ff',
                    background: '#fff',
                    fontSize: '15px',
                    color: '#1a1a2e',
                    marginBottom: '24px',
                    outline: 'none',
                }}
            />

            {/* Sort Buttons */}
            <button
                onClick={() => setSortOrder('newest')}
                style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid #dde5ff',
                    background: sortOrder === 'newest' ? '#4f6ef7' : '#fff',
                    color: sortOrder === 'newest' ? '#fff' : '#8892b0',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                }}
            >
                Newest
            </button>
            <button
                onClick={() => setSortOrder('oldest')}
                style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid #dde5ff',
                    background: sortOrder === 'oldest' ? '#4f6ef7' : '#fff',
                    color: sortOrder === 'oldest' ? '#fff' : '#8892b0',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                }}
            >
                Oldest
            </button>

            {/* Filtered Blog List */}
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post) =>(
                    <BlogCard key={post.slug} post = {post}/>
                ))
            ) : (
                <p style={{ color: '#8892b0', fontSize: '15px'}}>No posts found.</p>
            )}
        </div>
    );
}