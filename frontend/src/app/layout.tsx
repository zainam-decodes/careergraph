import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SplashScreen } from '@/components/splash-screen';

export const metadata: Metadata = {
  title: 'CareerGraph — Graph-Powered Career Intelligence',
  description: 'Map relationships between skills, roles, projects, and companies to discover realistic career paths.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            try {
              const storedTheme = localStorage.getItem('careergraph-theme');
              if (storedTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
              } else if (!storedTheme && window.matchMedia('(prefers-color-scheme: light)').matches) {
                document.documentElement.setAttribute('data-theme', 'light');
              }
            } catch (e) {}
          `}
        </Script>
      </head>
      <body style={{
        minHeight: '100dvh',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <SplashScreen />
        <Navbar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
