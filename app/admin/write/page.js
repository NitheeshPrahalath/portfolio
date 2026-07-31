import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../lib/session';
import { redirect } from 'next/navigation';
import BlogEditor from '../../../components/BlogEditor';
import { getGitHubTags } from '../../../lib/posts';

export const dynamic = 'force-dynamic';

export default async function WritePage() {
  const session = await getIronSession(await cookies(), sessionOptions);

  if (!session.isAdmin) {
    redirect('/admin/login');
  }

  const availableTags = await getGitHubTags();

  return <BlogEditor availableTags={availableTags} />;
}
