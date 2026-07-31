import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../lib/session';

export async function POST(request) {
  // Check admin session first
  const session = await getIronSession(await cookies(), sessionOptions);
  if (!session.isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, date, description, content, slug, tags } = await request.json();
  const tagsLine = tags?.length ? `\ntags: [${tags.map(t => `"${t}"`).join(', ')}]` : '';

  // Build the markdown file content
  const fileContent = `---
title: "${title}"
date: "${date}"
description: "${description}"${tagsLine}
---

${content}`;

  // Convert to base64 — GitHub API requires this
  const base64Content = Buffer.from(fileContent).toString('base64');
  const fileName = `${slug}.md`;
  const filePath = `content/blog/${fileName}`;

  try {
    // Check if file already exists (needed for updates)
    let sha = undefined;
    const checkRes = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );

    if (checkRes.ok) {
      const existing = await checkRes.json();
      sha = existing.sha; // needed to update an existing file
    }

    // Push to GitHub
    const pushRes = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `blog: add "${title}"`,
          content: base64Content,
          ...(sha && { sha }), // include sha only if updating
        }),
      }
    );

    if (!pushRes.ok) {
      const err = await pushRes.json();
      return Response.json({ error: err.message }, { status: 500 });
    }

    return Response.json({ success: true, slug });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
