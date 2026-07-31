'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { generateSlug } from '../lib/slug';
import TagMultiSelect from './TagMultiSelect';
import LogoutButton from './LogoutButton';

export default function BlogEditor({ initialPost, availableTags = [] }) {
  const router = useRouter();
  const isEdit = Boolean(initialPost);

  const [title, setTitle] = useState(initialPost?.title || '');
  const [description, setDescription] = useState(initialPost?.description || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [date, setDate] = useState(initialPost?.date || getToday());
  const [tags, setTags] = useState(initialPost?.tags || []);
  const [isDraft, setIsDraft] = useState(initialPost?.draft ?? false);
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [savedSlug, setSavedSlug] = useState(null);
  const [activeTab, setActiveTab] = useState('write');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);
  const contentRef = useRef(null);

  function getToday() {
    return new Date().toISOString().split('T')[0];
  }

  // Auto-generated slug until the admin edits it manually.
  const slugValue = slugTouched ? slug : generateSlug(title);
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readMinutes = Math.max(1, Math.ceil(words / 200));

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setContent('');
    setDate(getToday());
    setTags([]);
    setIsDraft(false);
    setSlug('');
    setSlugTouched(false);
    setSavedSlug(null);
    setStatus('idle');
    setError('');
  };

  const handleSlugBlur = () => {
    const clean = slugValue
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    if (clean !== slugValue) {
      setSlug(clean);
      setSlugTouched(true);
    }
  };

  const handlePublish = async () => {
    if (!title) {
      setError('Title is required.');
      return;
    }
    if (!isDraft && !content) {
      setError('Content is required to publish.');
      return;
    }
    if (!slugValue) {
      setError('Please enter a valid slug.');
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
        slug: slugValue,
        date,
        tags,
        draft: isDraft,
        originalSlug: initialPost?.slug,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setStatus('success');
      setSavedSlug(data.slug);
    } else {
      setError(data.error || 'Something went wrong.');
      setStatus('idle');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Only allow images
    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files are allowed.');
      return;
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be under 5MB.');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      // Convert to base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64,
          filename: file.name,
          mimeType: file.type,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Insert markdown image tag at the cursor position
        const imageMarkdown = `\n![${file.name}](${data.url})\n`;
        const textarea = contentRef.current;
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          setContent(content.slice(0, start) + imageMarkdown + content.slice(end));
          const nextCursor = start + imageMarkdown.length;
          requestAnimationFrame(() => {
            textarea.focus();
            textarea.setSelectionRange(nextCursor, nextCursor);
          });
        } else {
          setContent((prev) => prev + imageMarkdown);
        }
      } else {
        setUploadError(data.error || 'Upload failed.');
      }
    } catch {
      setUploadError('Something went wrong during upload.');
    } finally {
      setUploading(false);
      // Reset file input so same file can be uploaded again
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
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

  const logoutStyle = {
    background: 'var(--bg-card)',
    color: 'var(--text-muted)',
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    fontSize: '13px',
    cursor: 'pointer',
  };

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
          {isDraft ? 'Draft saved!' : isEdit ? 'Post updated!' : 'Post published!'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          {isDraft
            ? 'Your draft is in the repo but hidden from the public blog until you publish it.'
            : 'Vercel is deploying your post now. It&apos;ll be live in ~30 seconds.'}
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {!isEdit && (
            <button
              onClick={resetForm}
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
          )}
          <button
            onClick={() => router.push(isDraft ? `/admin/edit/${savedSlug}` : `/blog/${savedSlug}`)}
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
            {isDraft ? 'Edit draft →' : 'View post →'}
          </button>
          <button
            onClick={() => router.push('/admin')}
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
            Manage posts
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
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        <div>
          <Link href="/admin" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '8px' }}>
            ← Manage posts
          </Link>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
            {isEdit ? 'Edit Post' : 'Write a Post'}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {isEdit ? `Editing ${initialPost.slug}.md` : 'Admin only · publishes directly to GitHub'}
          </p>
        </div>
        <LogoutButton style={logoutStyle} />
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
        <TagMultiSelect selected={tags} onChange={setTags} availableTags={availableTags} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Slug</div>
            <input
              style={inputStyle}
              type="text"
              placeholder="my-post-slug"
              value={slugValue}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              onBlur={handleSlugBlur}
            />
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '-6px' }}>
              {!slugTouched
                ? 'Auto-generated from the title — edit to customize.'
                : `Lives at /blog/${slugValue || '…'}`}
            </p>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Publish date</div>
            <input
              style={{ ...inputStyle, colorScheme: 'light dark' }}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '-6px' }}>
              {isEdit ? 'Preserved from the original post.' : 'Defaults to today.'}
            </p>
          </div>
        </div>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--bg)',
            cursor: 'pointer',
            marginTop: '4px',
          }}
        >
          <input
            type="checkbox"
            checked={isDraft}
            onChange={(e) => setIsDraft(e.target.checked)}
            style={{ accentColor: 'var(--accent)', width: '16px', height: '16px', cursor: 'pointer', flexShrink: 0 }}
          />
          <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500', whiteSpace: 'nowrap' }}>
            Save as draft
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Drafts stay in your GitHub repo but are hidden from the public blog until you publish.
          </span>
        </label>
      </div>

      {/* Editor */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '16px',
      }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid var(--border)',
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        {/* Write / Preview tabs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={tabStyle('write')} onClick={() => setActiveTab('write')}>Write</button>
          <button style={tabStyle('preview')} onClick={() => setActiveTab('preview')}>Preview</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Live stats */}
          {words > 0 && (
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              {words.toLocaleString()} words · ~{readMinutes} min read
            </span>
          )}

          {/* Image upload */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {uploadError && (
              <span style={{ fontSize: '12px', color: '#e53e3e' }}>{uploadError}</span>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: uploading ? 'var(--accent-light)' : 'var(--bg)',
                color: uploading ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: '13px',
                fontWeight: '500',
                cursor: uploading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {uploading ? '⏳ Uploading...' : '🖼️ Add Image'}
            </label>
          </div>
        </div>
      </div>

        {/* Write tab */}
        {activeTab === 'write' && (
          <textarea
            ref={contentRef}
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
        {status === 'loading'
          ? (isDraft ? 'Saving draft...' : (isEdit ? 'Updating post...' : 'Publishing to GitHub...'))
          : (isDraft ? '💾 Save Draft' : (isEdit ? '💾 Update Post' : '🚀 Publish Post'))}
      </button>

    </div>
  );
}
