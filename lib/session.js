export const sessionOptions = {
  password: process.env.ADMIN_PASSWORD,
  cookieName: 'admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  },
};
