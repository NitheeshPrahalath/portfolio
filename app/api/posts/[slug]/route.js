import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../../lib/session';
import { sanitizeReadSlug } from '../../../../lib/slug';
import { resolveGitHubPostFileName } from '../../../../lib/posts';

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

// Extract /images/... filenames referenced in markdown or <img> tags
function extractImages(content) {
  const found = new Set();
  const markdownRegex = /!\[[^\]]*\]\(([^)\s]+)\)/g;
  const htmlRegex = /src=["']([^"']+)["']/g;
  for (const regex of [markdownRegex, htmlRegex]) {
    let match;
    while ((match = regex.exec(content)) !== null) {
      const url = match[1].split('#')[0].split('?')[0];
      if (!url.startsWith('/images/')) continue;
      const filename = url.replace('/images/', '');
      if (/^[a-z0-9.-]+$/.test(filename)) found.add(filename);
    }
  }
  return [...found];
}

// Check which of the given images are still referenced by other blog posts
async function findImagesUsedElsewhere(contentPath, images) {
  const used = new Set();
  if (images.length === 0) return used;

  const listRes = await fetch(apiUrl('content/blog'), { headers });
  if (!listRes.ok) return used;
  const files = await listRes.json();

  const others = files.filter((f) => f.name.endsWith('.md') && f.path !== contentPath);

  for (const file of others) {
    const res = await fetch(apiUrl(file.path), { headers });
    if (!res.ok) continue;
    const data = await res.json();
    const text = Buffer.from(data.content, 'base64').toString('utf8');
    for (const img of images) {
      if (text.includes(`/images/${img}`)) used.add(img);
    }
  }
  return used;
}

export async function DELETE(request, { params }) {
  // Check admin session first
  const session = await getIronSession(await cookies(), sessionOptions);
  if (!session.isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const safeSlug = sanitizeReadSlug(slug);

  if (!safeSlug) {
    return Response.json({ error: 'Invalid slug.' }, { status: 400 });
  }

  try {
    // Resolve the real filename — existing files may keep uppercase/underscores,
    // so the GitHub API path must match the actual name.
    const resolvedName = await resolveGitHubPostFileName(safeSlug);
    if (!resolvedName) {
      return Response.json({ error: 'Post not found.' }, { status: 404 });
    }
    const filePath = `content/blog/${resolvedName}.md`;

    // Fetch the post file — the SHA is required for deletion, the content
    // lets us find images that become orphans.
    const checkRes = await fetch(apiUrl(filePath), { headers });
    if (!checkRes.ok) {
      return Response.json({ error: 'Post not found.' }, { status: 404 });
    }
    const existing = await checkRes.json();
    const content = Buffer.from(existing.content, 'base64').toString('utf8');

    // Images referenced only by this post get deleted too; shared ones are kept.
    const referencedImages = extractImages(content);
    const usedElsewhere = await findImagesUsedElsewhere(filePath, referencedImages);
    const orphanImages = referencedImages.filter((img) => !usedElsewhere.has(img));

    // Delete the post first
    const delRes = await fetch(apiUrl(filePath), {
      method: 'DELETE',
      headers,
      body: JSON.stringify({
        message: `blog: delete "${safeSlug}"`,
        sha: existing.sha,
      }),
    });

    if (!delRes.ok) {
      const err = await delRes.json();
      return Response.json({ error: err.message }, { status: 500 });
    }

    // Delete the orphaned images
    const deletedImages = [];
    for (const img of orphanImages) {
      const imgPath = `public/images/${img}`;
      const imgSha = await getSha(imgPath);
      if (!imgSha) continue;
      const delImgRes = await fetch(apiUrl(imgPath), {
        method: 'DELETE',
        headers,
        body: JSON.stringify({
          message: `blog: delete unused image "${img}"`,
          sha: imgSha,
        }),
      });
      if (delImgRes.ok) deletedImages.push(img);
    }

    return Response.json({
      success: true,
      slug: safeSlug,
      deletedImages,
      keptImages: referencedImages.length - deletedImages.length,
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
