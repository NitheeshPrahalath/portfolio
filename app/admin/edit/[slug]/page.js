import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../../lib/session';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import BlogEditor from '../../../../components/BlogEditor';
import { getGitHubPostRaw, getGitHubTags } from '../../../../lib/posts';

export const dynamic = 'force-dynamic';

export default async function EditPage({ params }) {
  const { slug } = await params;

  const session = await getIronSession(await cookies(), sessionOptions);

  if (!session.isAdmin) {
    redirect('/admin/login');
  }

  let post;
  try {
    post = await getGitHubPostRaw(slug);
  } catch {
    notFound();
  }

  const availableTags = await getGitHubTags();

  return <BlogEditor initialPost={post} availableTags={availableTags} />;
}
