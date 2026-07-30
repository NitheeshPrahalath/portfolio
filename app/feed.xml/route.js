import { getAllPosts } from '../../lib/posts';

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = 'https://portfolio-theta-gray-6qan0q1mpo.vercel.app/';

  const rssItems = posts.map((post) => `
    <item>
      <title>${post.title}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <description>${post.description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${siteUrl}/blog/${post.slug}</guid>
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Nitheesh Prahalath's Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Writing about what I learn</description>
    <language>en</language>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
