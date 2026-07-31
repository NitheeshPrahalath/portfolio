import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../lib/session';
import { sanitizeSlug, sanitizeReadSlug } from '../../../lib/slug';
import { resolveGitHubPostFileName } from '../../../lib/posts';

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
  const submittedSlug = String(slug || '').trim();

  if (!title || (!draft && !content)) {
    return Response.json({ error: draft ? 'Title is required.' : 'Title and content are required.' }, { status: 400 });
  }
  if (!submittedSlug) {
    return Response.json({ error: 'Please enter a valid slug.' }, { status: 400 });
  }

  // Resolve the actual existing file for this post (if any) — existing files may
  // keep uppercase letters or underscores, so we must match the real filename.
  const existingName = originalSlug
    ? await resolveGitHubPostFileName(sanitizeReadSlug(originalSlug))
    : null;

  // If the editor submitted the same slug it loaded, keep writing to the exact
  // same file instead of sanitizing it into a different name.
  const unchanged = Boolean(existingName) && submittedSlug === originalSlug;

  const targetSlug = unchanged ? existingName : sanitizeSlug(submittedSlug);
  if (!unchanged && !/^[a-z0-9-]+$/.test(targetSlug)) {
    return Response.json({ error: 'Slug can only contain lowercase letters, numbers, and dashes.' }, { status: 400 });
  }
  const targetFilePath = `content/blog/${targetSlug}.md`;
  const isRename = Boolean(existingName) && !unchanged;

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

  try {
    const targetSha = await getSha(targetFilePath);

    // New posts and renames must not silently overwrite an existing file.
    if (!unchanged && targetSha) {
      return Response.json({ error: `A post with the slug "${targetSlug}" already exists.` }, { status: 409 });
    }

    // Create/update the new file first, then remove the old one on rename —
    // a failed delete can never lose content this way.
    const pushRes = await fetch(apiUrl(targetFilePath), {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: isRename
          ? `blog: rename to "${targetSlug}"`
          : targetSha ? `blog: update "${title}"` : `blog: add "${title}"`,
        content: base64Content,
        ...(targetSha && { sha: targetSha }),
      }),
    });

    if (!pushRes.ok) {
      const err = await pushRes.json();
      return Response.json({ error: err.message }, { status: 500 });
    }

    // Rename: delete the old file now that the new one is safely in place.
    if (isRename) {
      const oldPath = `content/blog/${existingName}.md`;
      const oldSha = await getSha(oldPath);
      if (oldSha) {
        const delRes = await fetch(apiUrl(oldPath), {
          method: 'DELETE',
          headers,
          body: JSON.stringify({
            message: `blog: rename "${title}" (${existingName} → ${targetSlug})`,
            sha: oldSha,
          }),
        });
        if (!delRes.ok) {
          const err = await delRes.json();
          return Response.json({ error: err.message }, { status: 500 });
        }
      }
    }

    return Response.json({ success: true, slug: targetSlug });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
