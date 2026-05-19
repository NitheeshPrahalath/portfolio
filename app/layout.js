import './globals.css';

export const metadata = {
  title: 'Natsu | Portfolio',
  description: 'My personal portfolio and blog',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}