import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../lib/session';
import { sanitizeSlug } from '../../../lib/slug';

const apiUrl = (filePath) =>
  `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${filePath}`;

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
};

async function getSha(filePath) {
  const res = await fetch(apiUrl(filePath), { headers });
  if (!res.ok) return null;
  const data = await res.json();
  return data.sha;
}

export async function POST(request) {
  // Check admin session first
  const session = await getIronSession(await cookies(), sessionOptions);
  if (!session.isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, date, description, content, slug, tags, originalSlug, draft } = await request.json();
  const safeSlug = sanitizeSlug(slug);
  const safeOriginalSlug = originalSlug ? sanitizeSlug(originalSlug) : undefined;

  if (!title || (!draft && !content)) {
    return Response.json({ error: draft ? 'Title is required.' : 'Title and content are required.' }, { status: 400 });
  }
  if (!safeSlug) {
    return Response.json({ error: 'Please enter a valid slug (letters, numbers, dashes).' }, { status: 400 });
  }
  if (!/^[a-z0-9-]+$/.test(safeSlug)) {
    return Response.json({ error: 'Slug can only contain lowercase letters, numbers, and dashes.' }, { status: 400 });
  }

  const tagsLine = tags?.length ? `\ntags: [${tags.map(t => `"${t}"`).join(', ')}]` : '';
  const draftLine = draft ? '\ndraft: true' : '';

  // Build the markdown file content
  const fileContent = `---
title: "${title}"
date: "${date}"
description: "${description}"${tagsLine}${draftLine}
---

${content}`;

  // Convert to base64 — GitHub API requires this
  const base64Content = Buffer.from(fileContent).toString('base64');
  const filePath = `content/blog/${safeSlug}.md`;
  const isUpdate = Boolean(safeOriginalSlug) && safeOriginalSlug === safeSlug;
  const isRename = Boolean(safeOriginalSlug) && safeOriginalSlug !== safeSlug;

  try {
    const targetSha = await getSha(filePath);

    // New posts and renames must not silently overwrite an existing file.
    if (!isUpdate && targetSha) {
      return Response.json({ error: `A post with the slug "${safeSlug}" already exists.` }, { status: 409 });
    }

    // Create/update the new file first, then remove the old one on rename —
    // a failed delete can never lose content this way.
    const pushRes = await fetch(apiUrl(filePath), {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: isRename
          ? `blog: rename to "${safeSlug}"`
          : targetSha ? `blog: update "${title}"` : `blog: add "${title}"`,
        content: base64Content,
        ...(isUpdate && targetSha && { sha: targetSha }),
      }),
    });

    if (!pushRes.ok) {
      const err = await pushRes.json();
      return Response.json({ error: err.message }, { status: 500 });
    }

    // Rename: delete the old file now that the new one is safely in place.
    if (isRename) {
      const oldPath = `content/blog/${safeOriginalSlug}.md`;
      const oldSha = await getSha(oldPath);
      if (oldSha) {
        const delRes = await fetch(apiUrl(oldPath), {
          method: 'DELETE',
          headers,
          body: JSON.stringify({
            message: `blog: rename "${title}" (${safeOriginalSlug} → ${safeSlug})`,
            sha: oldSha,
          }),
        });
        if (!delRes.ok) {
          const err = await delRes.json();
          return Response.json({ error: err.message }, { status: 500 });
        }
      }
    }

    return Response.json({ success: true, slug: safeSlug });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
