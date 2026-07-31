import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, adminIntentCookie } from '../../../lib/session';

export async function POST(request) {
  const { password } = await request.json();
  const session = await getIronSession(await cookies(), sessionOptions);

  if (password === process.env.ADMIN_PASSWORD) {
    session.isAdmin = true;
    await session.save();
    // Consume the contact-form intent flag so the login page can't be
    // reopened by URL after logging out.
    (await cookies()).delete(adminIntentCookie);
    return Response.json({ success: true });
  }

  return Response.json({ success: false, error: 'Wrong password' }, { status: 401 });
}

export async function DELETE() {
  const session = await getIronSession(await cookies(), sessionOptions);
  session.destroy();
  (await cookies()).delete(adminIntentCookie);
  return Response.json({ success: true });
}