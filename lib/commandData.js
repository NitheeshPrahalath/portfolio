import { getAllPosts } from './posts';
import { projects } from '../data/projects';

export function getCommandData() {
  const posts = getAllPosts();

  const pages = [
    { id: 'home', label: 'Home', subtitle: 'Go to homepage', href: '/', type: 'page' },
    { id: 'about', label: 'About', subtitle: 'Learn about me', href: '/about', type: 'page' },
    { id: 'projects', label: 'Projects', subtitle: 'See what I built', href: '/projects', type: 'page' },
    { id: 'blog', label: 'Blog', subtitle: 'Read my posts', href: '/blog', type: 'page' },
  ];

  const projectItems = projects.map((p) => ({
    id: `project-${p.title}`,
    label: p.title,
    subtitle: p.description,
    href: p.github || p.live || '/projects',
    type: 'project',
    external: !!(p.github || p.live),
  }));

  const postItems = posts.map((p) => ({
    id: `post-${p.slug}`,
    label: p.title,
    subtitle: p.description,
    href: `/blog/${p.slug}`,
    type: 'post',
  }));

  return [...pages, ...projectItems, ...postItems];
}