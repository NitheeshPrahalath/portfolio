import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import slug from 'remark-slug';

function getReadingTime(content) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Get all posts sorted by date
export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fn) => fn.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description || '',
        readingTime: getReadingTime(content),
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Get a single post by slug
export async function getPostBySlug(slugParam) {
  const fullPath = path.join(postsDirectory, `${slugParam}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(slug)           // ← adds id to headings first
    .use(html)           // ← then converts to HTML
    .process(content);

  const contentHtml = processedContent.toString();

  // Extract headings for table of contents
  const headings = [];
  const headingRegex = /<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[23]>/g;
  let match;
  while ((match = headingRegex.exec(contentHtml)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ''), // strip any nested HTML tags
    });
  }

  return {
    slug: slugParam,
    title: data.title,
    date: data.date,
    description: data.description || '',
    contentHtml,
    readingTime: getReadingTime(content),
    headings,
  };
}