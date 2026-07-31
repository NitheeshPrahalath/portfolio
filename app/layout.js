import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Providers from '../components/Providers';
import CommandPalette from '../components/CommandPalette';
import { getCommandData } from '../lib/commandData';

export const metadata = {
  title: 'Nitheesh Prahalath | Portfolio',
  description: 'My personal portfolio and blog',
  openGraph: {
    siteName: 'Nitheesh Prahalath | Portfolio',
    type: 'website',
    url: 'https://portfolio-theta-gray-6qan0q1mpo.vercel.app/',
  },
  twitter: {
    card: 'summary',
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
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