'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Hidden admin entry point — only redirects to the login page,
      // which still requires the admin password.
      if (data?.adminRedirect) {
        router.push('/admin/login');
        return;
      }

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    fontSize: '15px',
    outline: 'none',
    marginBottom: '14px',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  };

  return (
    <div>
      {status === 'success' ? (
        <div style={{
          background: 'var(--accent-light)',
          color: 'var(--accent)',
          padding: '16px 20px',
          borderRadius: '10px',
          fontSize: '15px',
          fontWeight: '500',
        }}>
          ✓ Message sent! I&apos;ll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '4px', fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Name</div>
          <input
            style={inputStyle}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />

          <div style={{ marginBottom: '4px', fontSize: '13px', color: 'var(--text-muted)' }}>Email</div>
          <input
            style={inputStyle}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />

          <div style={{ marginBottom: '4px', fontSize: '13px', color: 'var(--text-muted)' }}>Message</div>
          <textarea
            style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="What's on your mind?"
            required
          />

          {status === 'error' && (
            <p style={{ color: '#e53e3e', fontSize: '13px', marginBottom: '12px' }}>
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              background: 'var(--accent)',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}
