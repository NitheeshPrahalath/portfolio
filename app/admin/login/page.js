import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../lib/session';
import { redirect } from 'next/navigation';
import AdminLoginForm from '../../../components/AdminLoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const session = await getIronSession(await cookies(), sessionOptions);

  if (session.isAdmin) {
    redirect('/admin');
  }

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '380px',
      }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Admin Login
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>
          Only you have access to this page.
        </p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
