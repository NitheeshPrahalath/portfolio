import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { sanitizeSlug } from './slug.js';

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
        tags: data.tags || [],
        draft: data.draft === true,
      };
    });

  // Drafts live in the repo but are hidden from the public blog
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Get a single post's raw frontmatter + markdown content (local checkout)
export function getPostRaw(slugParam) {
  const fullPath = path.join(postsDirectory, `${slugParam}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: slugParam,
    title: data.title,
    date: data.date,
    description: data.description || '',
    tags: data.tags || [],
    draft: data.draft === true,
    content,
  };
}

// GitHub-backed helpers for the admin panel (source of truth is the repo).
// Falls back to the local checkout when GitHub is unreachable.

const ghBase = () =>
  `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`;

const ghBranch = () => process.env.GITHUB_BRANCH || 'main';

const ghHeaders = () => {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
};

// List all posts from the repo (title, date, tags, reading time)
export async function getGitHubPosts() {
  try {
    const res = await fetch(`${ghBase()}/contents/content/blog`, {
      headers: ghHeaders(),
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`GitHub listing failed (${res.status})`);

    const files = await res.json();
    const mdFiles = files.filter((f) => f.name.endsWith('.md'));

    const posts = await Promise.all(
      mdFiles.map(async (f) => {
        const slug = f.name.replace(/\.md$/, '');
        try {
          const rawRes = await fetch(
            `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/${ghBranch()}/${f.path}`,
            { next: { revalidate: 0 } }
          );
          const fileContents = rawRes.ok ? await rawRes.text() : '';
          const { data, content } = matter(fileContents);
          return {
            slug,
            title: data.title || slug,
            date: data.date || '',
            description: data.description || '',
            readingTime: getReadingTime(content),
            tags: data.tags || [],
            draft: data.draft === true,
          };
        } catch {
          return { slug, title: slug, date: '', description: '', readingTime: '', tags: [], draft: false };
        }
      })
    );

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch {
    return getAllPosts();
  }
}

// Unique tag list from all posts (used by the editor's tag picker)
export async function getGitHubTags() {
  const posts = await getGitHubPosts();
  const tags = new Set();
  posts.forEach((post) => (post.tags || []).forEach((tag) => tags.add(tag)));
  return [...tags].sort();
}

// Get a single post's raw frontmatter + markdown content from the repo
export async function getGitHubPostRaw(slugParam) {
  const safeSlug = sanitizeSlug(slugParam);
  try {
    const rawRes = await fetch(
      `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/${ghBranch()}/content/blog/${safeSlug}.md`,
      { next: { revalidate: 0 } }
    );
    if (rawRes.ok) {
      const fileContents = await rawRes.text();
      const { data, content } = matter(fileContents);
      return {
        slug: safeSlug,
        title: data.title || safeSlug,
        date: data.date || '',
        description: data.description || '',
        tags: data.tags || [],
        draft: data.draft === true,
        content,
      };
    }
  } catch {
    // fall through to local checkout
  }
  return getPostRaw(safeSlug);
}

// Get a single post by slug
export async function getPostBySlug(slugParam) {
  const fullPath = path.join(postsDirectory, `${slugParam}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Drafts are not publicly accessible
  if (data.draft === true) return null;

  // Step 1 — Markdown to HTML AST
  const processedMarkdown = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedMarkdown.toString();

  // Step 2 — Extract headings for TOC
  const headings = [];
  const headingRegex = /<h([23])[^>]*\sid="([^"]+)"[^>]*>(.*?)<\/h\1>/g;
  let match;
  while ((match = headingRegex.exec(contentHtml)) !== null) {
    headings.push({
      level: parseInt(match[1], 10),
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
    tags: data.tags || [],       // ← add this
  };
}