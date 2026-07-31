'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ style }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch('/api/auth', { method: 'DELETE' });
    // The login page is gated behind the contact-form trigger, so return home.
    router.push('/');
    router.refresh();
  };

  return (
    <button onClick={handleLogout} disabled={loading} style={style}>
      {loading ? 'Logging out…' : 'Logout'}
    </button>
  );
}
