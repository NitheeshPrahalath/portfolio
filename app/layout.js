import './globals.css';
import 'highlight.js/styles/atom-one-dark.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Providers from '../components/Providers';
import CommandPalette from '../components/CommandPalette';
import { getCommandData } from '../lib/commandData';

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f0f4ff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0f19' },
  ],
};

export const metadata = {
  metadataBase: new URL('https://portfolio-theta-gray-6qan0q1mpo.vercel.app'),
  title: 'Nitheesh Prahalath | Portfolio',
  description: 'My personal portfolio and blog',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    siteName: 'Nitheesh Prahalath | Portfolio',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary',
  },
};

export default async function RootLayout({ children }) {
  const commandItems = getCommandData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <CommandPalette items={commandItems} />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}