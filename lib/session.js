export const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  },
};

// Short-lived "came from the contact form" flag that gates the login page.
export const adminIntentCookie = 'admin_login_intent';
