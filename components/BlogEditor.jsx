'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { marked } from 'marked';

export default function BlogEditor() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('write');
  const [tags, setTags] = useState('');

  const generateSlug = (text) =>
    text.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

  const getToday = () => new Date().toISOString().split('T')[0];

  const handlePublish = async () => {
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    setStatus('loading');
    setError('');

    const res = await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        content,
        slug: generateSlug(title),
        date: getToday(),
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      }),
    });

    const data = await res.json();

    if (data.success) {
      setStatus('success');
    } else {
      setError(data.error || 'Something went wrong.');
      setStatus('idle');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin');
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text-primary)',
    fontSize: '15px',
    outline: 'none',
    fontFamily: 'inherit',
    marginBottom: '12px',
  };

  const tabStyle = (tab) => ({
    padding: '8px 20px',
    borderRadius: '8px',
    border: 'none',
    background: activeTab === tab ? 'var(--accent)' : 'var(--bg-card)',
    color: activeTab === tab ? '#fff' : 'var(--text-muted)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  if (status === 'success') {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '48px' }}>🎉</div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
          Post published!
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Vercel is deploying your post now. It'll be live in ~30 seconds.
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            onClick={() => {
              setTitle('');
              setDescription('');
              setContent('');
              setStatus('idle');
            }}
            style={{
              background: 'var(--accent)',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Write another post
          </button>
          <button
            onClick={() => router.push('/blog')}
            style={{
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              padding: '10px 24px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            View blog →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Write a Post
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Admin only · publishes directly to GitHub
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-muted)',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      {/* Metadata */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '16px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Post details
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Title</div>
        <input
          style={inputStyle}
          type="text"
          placeholder="Your post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Description</div>
        <input
          style={inputStyle}
          type="text"
          placeholder="One line summary"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Tags</div>
        <input
          style={inputStyle}
          type="text"
          placeholder="React, Next.js, Beginner  (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* Auto date display — add this */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '4px',
          padding: '8px 14px',
          background: 'var(--accent-light)',
          borderRadius: '8px',
          fontSize: '13px',
          color: 'var(--accent)',
        }}>
          <span>📅</span>
          <span>Will be published with today's date: <strong>{getToday()}</strong></span>
        </div>
        
        {title && (
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Slug: <span style={{ color: 'var(--accent)' }}>{generateSlug(title)}</span>
          </p>
        )}
      </div>

      {/* Editor */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '16px',
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 16px',
          borderBottom: '1px solid var(--border)',
        }}>
          <button style={tabStyle('write')} onClick={() => setActiveTab('write')}>Write</button>
          <button style={tabStyle('preview')} onClick={() => setActiveTab('preview')}>Preview</button>
        </div>

        {/* Write tab */}
        {activeTab === 'write' && (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Write your post in markdown...\n\n## Heading\n\nParagraph text here.`}
            style={{
              width: '100%',
              minHeight: '400px',
              padding: '20px',
              border: 'none',
              background: 'var(--bg)',
              color: 'var(--text-primary)',
              fontSize: '15px',
              fontFamily: 'monospace',
              lineHeight: '1.7',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        )}

        {/* Preview tab */}
        {activeTab === 'preview' && (
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: marked(content || '_Nothing to preview yet._') }}
            style={{
              padding: '20px',
              minHeight: '400px',
              lineHeight: '1.8',
              fontSize: '15px',
              color: 'var(--text-secondary)',
            }}
          />
        )}
      </div>

      {/* Error */}
      {error && (
        <p style={{ color: '#e53e3e', fontSize: '13px', marginBottom: '12px' }}>
          {error}
        </p>
      )}

      {/* Publish */}
      <button
        onClick={handlePublish}
        disabled={status === 'loading'}
        style={{
          background: 'var(--accent)',
          color: '#fff',
          padding: '12px 32px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '15px',
          fontWeight: '600',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
          transition: 'opacity 0.2s',
          width: '100%',
        }}
      >
        {status === 'loading' ? 'Publishing to GitHub...' : '🚀 Publish Post'}
      </button>

    </div>
  );
}
