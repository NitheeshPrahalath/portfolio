import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../lib/session';
import { redirect } from 'next/navigation';
import BlogEditor from '../../../components/BlogEditor';

export default async function WritePage() {
  const session = await getIronSession(await cookies(), sessionOptions);

  if (!session.isAdmin) {
    redirect('/admin');
  }

  return <BlogEditor />;
}
