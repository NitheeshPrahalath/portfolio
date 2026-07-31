import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../lib/session';

export async function POST(request) {
  // Auth check
  const session = await getIronSession(await cookies(), sessionOptions);
  if (!session.isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { base64, filename, mimeType } = await request.json();

  // Sanitize filename — remove spaces and special chars
  const safeFilename = filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.\-]/g, '');

  const filePath = `public/images/${safeFilename}`;

  try {
    // Check if file already exists
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
      sha = existing.sha;
    }

    // Push image to GitHub
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
          message: `upload: add image ${safeFilename}`,
          content: base64,
          ...(sha && { sha }),
        }),
      }
    );

    if (!pushRes.ok) {
      const err = await pushRes.json();
      return Response.json({ error: err.message }, { status: 500 });
    }

    return Response.json({
      success: true,
      url: `/images/${safeFilename}`,
    });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}