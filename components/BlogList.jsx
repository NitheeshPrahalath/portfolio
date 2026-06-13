'use client';

import BlogCard from './BlogCard';

export default function BlogList({ posts}) {
    return (
        <div>
            {posts.map((post) =>(
                <BlogCard key={post.slug} post = {post}/>
            ))}
        </div>
    )
}