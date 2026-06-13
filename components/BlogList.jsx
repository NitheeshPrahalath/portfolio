'use client';

import { useState} from 'react';
import BlogCard from './BlogCard';

export default function BlogList({ posts}) {
    const [search, setSearch] = useState('');

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

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