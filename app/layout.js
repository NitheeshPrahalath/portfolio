import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}