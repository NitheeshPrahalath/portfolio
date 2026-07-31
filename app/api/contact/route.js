export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { name, email, message } = body;

  // Hidden admin entry point: a specific sender + trigger phrase redirects
  // to the admin login. This is only a *discovery* mechanism — the login page
  // still requires the real admin password, so auth is never bypassed.
  const adminEmail = process.env.ADMIN_EMAIL;
  const triggerPhrase = process.env.ADMIN_TRIGGER_PHRASE;

  const isAdminTrigger =
    adminEmail &&
    triggerPhrase &&
    typeof email === 'string' &&
    typeof message === 'string' &&
    email.trim().toLowerCase() === adminEmail.toLowerCase() &&
    message.toLowerCase().includes(triggerPhrase.toLowerCase());

  if (isAdminTrigger) {
    return Response.json({ success: true, adminRedirect: true });
  }

  // Normal flow — forward the message to Formspree so it still gets delivered.
  const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL;
  if (!formspreeUrl) {
    return Response.json({ error: 'Contact service not configured.' }, { status: 500 });
  }

  try {
    const res = await fetch(formspreeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      return Response.json({ success: true });
    }
    return Response.json({ error: 'Failed to send message.' }, { status: 500 });
  } catch {
    return Response.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
