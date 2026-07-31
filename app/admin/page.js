import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../lib/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import PostManager from '../../components/PostManager';
import LogoutButton from '../../components/LogoutButton';
import { getGitHubPosts } from '../../lib/posts';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getIronSession(await cookies(), sessionOptions);

  if (!session.isAdmin) {
    redirect('/admin/login');
  }

  const posts = await getGitHubPosts();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px',
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Manage Posts
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Admin only · changes are pushed to GitHub and deployed by Vercel
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link
            href="/admin/write"
            style={{
              background: 'var(--accent)',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            + New Post
          </Link>
          <LogoutButton style={{
            background: 'var(--bg-card)',
            color: 'var(--text-muted)',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            fontSize: '13px',
            cursor: 'pointer',
          }} />
        </div>
      </div>

      <PostManager posts={posts} />
    </div>
  );
}
