import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

export const metadata = {
  title: 'Nitheesh Prahalath | Portfolio',
  description: 'My personal portfolio and blog',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}