'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Wrong password. Try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '4px', fontSize: '13px', color: 'var(--text-muted)' }}>
        Password
      </div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter admin password"
        required
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: 'var(--bg)',
          color: 'var(--text-primary)',
          fontSize: '15px',
          outline: 'none',
          marginBottom: '16px',
          fontFamily: 'inherit',
        }}
      />
      {error && (
        <p style={{ color: '#e53e3e', fontSize: '13px', marginBottom: '12px' }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          background: 'var(--accent)',
          color: '#fff',
          padding: '10px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '15px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
