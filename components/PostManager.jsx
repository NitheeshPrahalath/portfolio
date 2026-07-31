'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PostManager({ posts }) {
  const router = useRouter();
  const [items, setItems] = useState(posts);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleDelete = async () => {
    setDeleting(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/posts/${encodeURIComponent(pendingDelete.slug)}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        const imageNote = data.deletedImages?.length
          ? ` Removed ${data.deletedImages.length} image${data.deletedImages.length === 1 ? '' : 's'} no longer used by any post.`
          : '';
        setMessage({ type: 'success', text: `Deleted "${pendingDelete.title}".${imageNote}` });
        setItems((prev) => prev.filter((p) => p.slug !== pendingDelete.slug));
        setPendingDelete(null);
        router.refresh();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to delete the post.' });
        setPendingDelete(null);
      }
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong.' });
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {message && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          marginBottom: '16px',
          background: message.type === 'success' ? 'var(--accent-light)' : '#fde8e8',
          color: message.type === 'success' ? 'var(--accent)' : '#c53030',
        }}>
          {message.text}
        </div>
      )}

      {items.length === 0 ? (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '15px',
        }}>
          No posts yet. Write your first one.
        </div>
      ) : (
        <div>
          {items.map((post) => (
            <div
              key={post.slug}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                background: 'var(--bg-card)',
                marginBottom: '10px',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <Link
                    href={`/admin/edit/${post.slug}`}
                    style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                    }}
                  >
                    {post.title}
                  </Link>
                  {post.draft && (
                    <span style={{
                      background: 'var(--accent-light)',
                      color: 'var(--accent)',
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '2px 10px',
                      borderRadius: '999px',
                    }}>
                      Draft
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {post.date}
                  {post.readingTime ? ` · ${post.readingTime}` : ''}
                  {post.tags?.length ? ` · ${post.tags.join(', ')}` : ''}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <Link
                  href={`/admin/edit/${post.slug}`}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => setPendingDelete(post)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    color: '#c53030',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {pendingDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '20px',
          }}
          onClick={() => { if (!deleting) setPendingDelete(null); }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '28px',
              maxWidth: '420px',
              width: '100%',
            }}
          >
            <h3 id="delete-dialog-title" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px' }}>
              Delete post?
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '6px' }}>
              This permanently removes <strong>{pendingDelete.title}</strong> (<code style={{ color: 'var(--accent)' }}>{pendingDelete.slug}.md</code>) from the blog and from GitHub. Images used only by this post will be deleted too.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              This action can&apos;t be undone. The live post disappears as soon as Vercel redeploys.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setPendingDelete(null)}
                disabled={deleting}
                style={{
                  padding: '9px 20px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  padding: '9px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#e53e3e',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                  opacity: deleting ? 0.7 : 1,
                }}
              >
                {deleting ? 'Deleting…' : 'Delete post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
