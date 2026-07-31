# Nitheesh Prahalath — Portfolio (Feature Guide)

A personal portfolio + blog built with **Next.js (App Router)**. This document explains every feature, how the app works, the folder structure, and the data flows — so a human **or an AI assistant (GPT)** can read it and immediately understand the codebase and continue working on it.

---

## 1. Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js **16.2.6** (App Router, Turbopack) |
| UI | React **19** (JSX, inline styles + a small `globals.css`) |
| Language | JavaScript (`.js` / `.jsx`, no TypeScript) |
| Markdown | `gray-matter` (frontmatter), `remark` + `remark-rehype` + `rehype-slug` + `rehype-highlight` + `rehype-stringify` |
| Code highlighting | `rehype-highlight` + `highlight.js` (atom-one-dark theme) |
| Theming | `next-themes` (light/dark, persisted in localStorage) |
| Auth | `iron-session` (encrypted cookie sessions) |
| CMS | none — blog posts are `.md` files committed to GitHub via API |
| Static assets | `public/` folder |
| SEO | `next-sitemap` (robots.txt + sitemap.xml), `next/og` (dynamic OG images) |
| Deployment | Vercel |

> **IMPORTANT for any AI continuing this project:** `AGENTS.md` warns that this is a modified Next.js version with breaking changes. **Read `node_modules/next/dist/docs/` before changing anything framework-related.** Notably: `next lint` is removed (use `eslint .`), and `themeColor` lives in a `viewport` export (not `metadata`).

---

## 2. Quick Start

```bash
npm install
npm run dev      # development server → http://localhost:3000
npm run lint     # ESLint (eslint .)
npm run build    # production build + postbuild (next-sitemap)
npm run start    # serve the production build
```

### Environment variables (`.env.local`)

| Variable | Used by | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | `app/api/auth/route.js` | Plain-text admin password |
| `SESSION_SECRET` | `lib/session.js` | ≥32-char secret for iron-session cookies |
| `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_TOKEN` | `app/api/publish/route.js`, `app/api/upload/route.js` | Where the admin writes posts/images |
| `NEXT_PUBLIC_FORMSPREE_URL` | `components/ContactForm.jsx` | Formspree endpoint for the contact form |

---

## 3. Folder Structure

```
portfolio/
├── AGENTS.md                      # Rules for AI agents (read this first)
├── FEATURES.md                    # ← This file
├── README.md                      # Default create-next-app readme (outdated)
├── CLAUDE.md                      # (duplicate agent rules)
├── package.json                   # Scripts + dependencies
├── jsconfig.json                  # JS path aliases (@/*)
├── next.config.mjs                # Empty Next.js config
├── next-sitemap.config.js         # Sitemap/robots generation config
├── eslint.config.mjs              # ESLint flat config
│
├── app/                           # Next.js App Router pages
│   ├── layout.js                  # Root layout: Navbar, CommandPalette, Footer, metadata
│   ├── page.js                    # Home page (hero, featured projects, recent posts)
│   ├── globals.css                # CSS variables (themes) + global element styles
│   ├── not-found.js               # 404 page
│   ├── opengraph-image.js         # Site-wide dynamic OG share image (next/og)
│   ├── favicon.ico
│   │
│   ├── about/page.js              # About page (skills, socials, contact form)
│   ├── projects/page.js           # Projects page + GitHub activity feed
│   ├── projects/loading.js        # Skeleton loading state
│   │
│   ├── blog/page.js               # Blog listing (BlogList)
│   ├── blog/loading.js            # Skeleton loading state
│   ├── blog/[slug]/page.js        # Single blog post (TOC, reading progress, content)
│   ├── blog/[slug]/opengraph-image.js  # Per-post dynamic OG image
│   │
│   ├── admin/page.js              # Admin login (redirects to /admin/write if authed)
│   ├── admin/write/page.js        # Blog editor (auth-gated)
│   │
│   ├── api/
│   │   ├── auth/route.js          # POST login / DELETE logout (iron-session)
│   │   ├── publish/route.js       # POST → writes a .md post to GitHub
│   │   └── upload/route.js        # POST → uploads an image to GitHub (public/images)
│   │
│   ├── feed.xml/route.js          # RSS 2.0 feed generator
│   │
├── components/                    # Reusable React components
│   ├── Navbar.jsx                 # Sticky navbar, desktop links, mobile drawer
│   ├── CommandPalette.jsx         # Cmd+K / Ctrl+K search palette
│   ├── Footer.jsx
│   ├── Providers.jsx              # next-themes ThemeProvider
│   ├── Container.jsx              # Max-width wrapper (760px)
│   ├── Section.jsx                # Vertical spacing wrapper
│   ├── BlogCard.jsx               # Single post preview card
│   ├── BlogList.jsx               # Search + sort + tag filter + list
│   ├── ProjectCard.jsx            # Single project card
│   ├── ProjectList.jsx            # Tech-tag filter + list
│   ├── GitHubFeed.jsx             # Server component: recent GitHub events
│   ├── TableOfContents.jsx        # Desktop sidebar + mobile floating TOC
│   ├── ReadingProgress.jsx        # Top scroll progress bar
│   ├── ContactForm.jsx            # Formspree-powered contact form
│   ├── CopyEmail.jsx              # Click-to-copy email button
│   ├── BlogEditor.jsx             # Admin markdown editor (publish + image upload)
│   └── AdminLoginForm.jsx         # Password login form
│
├── lib/
│   ├── posts.js                   # Markdown loading, parsing, headings extraction
│   ├── commandData.js             # Command palette item list (pages/projects/posts)
│   └── session.js                 # iron-session options
│
├── data/
│   └── projects.js                # Static projects list
│
├── content/
│   └── blog/*.md                  # Blog posts (frontmatter + markdown)
│
└── public/                        # Static files served at root
    ├── robots.txt                 # Generated by next-sitemap
    ├── sitemap.xml                # Generated by next-sitemap
    ├── images/                    # Blog images (uploaded via admin)
    ├── Nitheesh_Prahalath_Updated_Resume.pdf / .docx
    └── *.svg                      # Default create-next-app icons
```

---

## 4. Pages & Routes

| Route | Type | Description |
| --- | --- | --- |
| `/` | Static | Hero, featured projects, 3 recent posts |
| `/about` | Static | Bio, skills, socials, copy-email, contact form |
| `/projects` | Static (1h ISR) | Project list + live GitHub activity |
| `/blog` | Static | Blog listing with search/sort/tag-filter |
| `/blog/[slug]` | SSG | Single post — `generateStaticParams` builds every post at build time |
| `/admin` | Dynamic | Admin login |
| `/admin/write` | Dynamic | Auth-gated blog editor |
| `/feed.xml` | Dynamic | RSS 2.0 feed of all posts |
| `/opengraph-image` | Static | Generated OG share image |
| `/blog/-/opengraph-image` | Dynamic | Per-post OG share image |
| `/api/auth` | Dynamic | Login/logout |
| `/api/publish` | Dynamic | Publish post to GitHub |
| `/api/upload` | Dynamic | Upload image to GitHub |

---

## 5. Features

### 5.1 Navigation (`components/Navbar.jsx`)
- Sticky top bar with site name, **desktop links** (About, Projects, Blog), a **Search ⌘K** button, and a **theme toggle**.
- **Responsive:** at `≤768px` the desktop links are hidden and a hamburger opens a full-screen **mobile drawer** (Home/About/Projects/Blog + theme toggle).
  - CSS lives in a `<style>` block inside the component using the classes `.desktop-nav` / `.mobile-nav`.
  - The drawer is closed on every route change (render-time state adjustment).
  - Drawer is `inert` + `aria-hidden` + `visibility:hidden` when closed so off-screen links can't be tabbed to.
- The **Search ⌘K** button dispatches `window.dispatchEvent(new CustomEvent('toggle-palette'))` (it does NOT synthesize a keyboard event — that was unreliable).

### 5.2 Command Palette (`components/CommandPalette.jsx`)
- Global search overlay opened via **Cmd/Ctrl+K** or the navbar Search button (custom `toggle-palette` event); closed via ESC, backdrop click, or selecting an item.
- Items come from `lib/commandData.js` (built server-side in `app/layout.js`): **pages** (Home/About/Projects/Blog), **projects** (from `data/projects.js`), and **posts** (from `content/blog/*.md`).
- Features: type-to-filter (label + subtitle), arrow-key navigation, Enter to open, mouse hover selection, external links open in a new tab.

### 5.3 Dark Mode (`components/Providers.jsx`, `Navbar.jsx`, `app/globals.css`)
- `next-themes` with `attribute="data-theme"`, default light, system preference disabled.
- Toggle button (🌙/☀️) in both desktop and mobile navs. The `data-theme` attribute switches the CSS variable palette in `globals.css` (`:root` = light, `[data-theme='dark']` = dark).
- Rendering is hydration-safe: the theme toggle only mounts after `useSyncExternalStore` reports `mounted`.

### 5.4 Blog Content Pipeline (`lib/posts.js`)
- Posts are Markdown files in `content/blog/*.md` with **YAML frontmatter**:
  ```yaml
  ---
  title: "My Post"
  date: "2026-07-31"
  description: "One-line summary"
  tags: ["React", "Next.js"]
  ---
  ```
- `getAllPosts()` — reads all files, returns `{ slug, title, date, description, readingTime, tags }`, sorted newest-first.
- `getPostBySlug(slug)` — parses frontmatter, then runs the remark pipeline:
  **markdown → rehype (slug IDs on headings) → rehype-highlight (code syntax) → HTML string**.
  It also extracts `<h2>`/`<h3>` headings **via regex** into a `headings` array used for the Table of Contents.
- The rendered HTML is injected with `dangerouslySetInnerHTML` on the post page. Only admins can create posts, so this is considered safe.
- Blog post page also renders `<ReadingProgress />` (top progress bar) and `<TableOfContents />`.

### 5.5 Table of Contents (`components/TableOfContents.jsx`)
- **Desktop:** fixed right sidebar (appears after scrolling 200px, via IntersectionObserver to highlight the active heading).
- **Mobile:** floating button (bottom-right) that opens a dropdown; backdrops/classes hide it on desktop via the `.toc-desktop` / `.toc-mobile` CSS classes.

### 5.6 Blog Listing (`components/BlogList.jsx` + `BlogCard.jsx`)
- **Search** box (matches post title only).
- **Newest / Oldest** sort toggle.
- **Tag filter pills** built dynamically from all posts.
- `BlogCard` shows date, reading time, title, description, tag pills, and a hover arrow.

### 5.7 Projects (`components/ProjectList.jsx`, `ProjectCard.jsx`, `data/projects.js`)
- Projects are a static array in `data/projects.js`: `{ title, description, tech[], github, live, featured }`.
- `ProjectList` filters cards by tech pills; the home page shows only `featured: true`.
- `ProjectCard` links to GitHub / live URL.

### 5.8 GitHub Activity (`components/GitHubFeed.jsx`)
- Server component that fetches `https://api.github.com/users/NitheeshPrahalath/events/public` with **1-hour ISR caching**, shows the last 5 events as friendly labels with relative timestamps.

### 5.9 Contact Form (`components/ContactForm.jsx`)
- Client component posting JSON to `process.env.NEXT_PUBLIC_FORMSPREE_URL` (Formspree). Shows loading/success/error states.

### 5.10 Copy Email (`components/CopyEmail.jsx`)
- Button using the Clipboard API; expands on hover, shows "✓ Copied!".

### 5.11 Admin / CMS (`app/admin/*`, `app/api/*`, `components/BlogEditor.jsx`)
- **Auth:** `/admin` shows `AdminLoginForm`; POST `/api/auth` compares the password to `ADMIN_PASSWORD` and sets `session.isAdmin` via iron-session cookie. `GET` `/admin` redirects to `/admin/write` if already authed; `/admin/write` redirects to `/admin` if not.
- **Editor (`BlogEditor.jsx`):** title, description, tags, date (auto = today), Write/Preview tabs (Preview uses `marked`), an **"Add Image"** uploader, and Publish.
- **Publish (`/api/publish`):** builds a markdown file with frontmatter and pushes it to GitHub at `content/blog/<slug>.md` via the GitHub Contents API (creates or updates using the file `sha`).
- **Image upload (`/api/upload`):** converts the file to base64 client-side, pushes it to GitHub at `public/images/<sanitized-name>`, returns the public URL `/images/<name>`. The editor then inserts `![name](/images/name.png)` **at the textarea cursor position**.
- **Important:** posts/images only appear after GitHub is updated AND the Vercel build picks them up (the build reads files from the repo).

### 5.12 SEO & Social (`app/layout.js`, `app/blog/[slug]/page.js`, `app/opengraph-image.js`)
- `metadata` (root) + `generateMetadata` (blog posts) provide title, description, canonical, Open Graph and Twitter tags.
- **Dynamic OG images** generated with `next/og` (`ImageResponse`): a site-wide card at `app/opengraph-image.js` and per-post cards at `app/blog/[slug]/opengraph-image.js` (shows the post title).
- `themeColor` is exported from `app/layout.js` **via the `viewport` export** (required in Next 16).
- `next-sitemap` runs on every build (`postbuild` script) and regenerates `public/robots.txt` + `public/sitemap.xml`.

### 5.13 RSS Feed (`app/feed.xml/route.js`)
- Hand-written route producing RSS 2.0 XML from `getAllPosts()`; XML content is escaped. Auto-discovered via `<link rel="alternate" type="application/rss+xml">` in root metadata.

---

## 6. Styling System

- **Design tokens** are CSS variables in `app/globals.css` (`--bg`, `--bg-card`, `--text-primary`, `--text-secondary`, `--text-muted`, `--accent`, `--accent-light`, `--border`) for both themes.
- Almost all component styling is **inline `style={{}}` objects** referencing those variables — there are very few global classes.
- Global styles only cover: theme vars, reset, base elements, `.project-card`, `.post-content` (headings/paragraphs/code/links), animations (`.fade-up`), and responsive tweaks.
- **Code blocks** use the `atom-one-dark` highlight.js theme (imported in `app/layout.js`); `.post-content pre` styles are overridden to match.
- Responsive breakpoint used in components: `768px`.

---

## 7. Scripts (`package.json`)

| Script | Command |
| --- | --- |
| `dev` | `next dev` |
| `build` | `next build` |
| `postbuild` | `next-sitemap` (runs automatically after build) |
| `start` | `next start` |
| `lint` | `eslint .` (NOT `next lint` — removed in Next 16) |

---

## 8. Known Notes / Gotchas (for a GPT continuing this project)

1. **The project is JavaScript (JSX), not TypeScript** — Next.js still runs a type check during build.
2. **`AGENTS.md` instructs reading `node_modules/next/dist/docs/` before framework changes** — this Next.js version has breaking differences (e.g., `next lint` removed, `viewport` export, `unstable_instant`).
3. **`next-sitemap` output (`public/robots.txt`, `public/sitemap.xml`) is regenerated on every build** — don't hand-edit them.
4. **`content/blog/image/` moved to `public/images/`** — blog images must live in `public/images/` and be referenced as `/images/...` (Next.js only serves `public/`; a relative path like `image/...` will 404).
5. **Admin-written posts must have clean, unindented frontmatter** — a template-literal indentation bug historically produced invalid YAML and broke `npm run build` (fixed in `app/api/publish/route.js`).
6. **There are two posts titled "Learning React Day 3"** (`React-Day-3.md` and `Learning_React_Day_3.md`) — likely duplicates that could be cleaned up.
7. **`dangerouslySetInnerHTML`** is used for post content; the markdown is not sanitized, so only allow admin-created content.
8. **Admin password is compared with plain `===`** (timing-attack sensitive) — acceptable for a personal site, but improvable.
9. **`npm audit`** reports vulnerabilities in `next` (pre-16.3, no middleware used → low risk) and ESLint dev deps.
10. **`README.md` is the default create-next-app boilerplate** and does not describe this project.
