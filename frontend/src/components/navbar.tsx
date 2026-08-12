'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' | null;
    if (currentTheme) setTheme(currentTheme);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('careergraph-theme', newTheme);
  };

  // Primary nav: Explore | Matches | Graph only
  const navLinks = [
    { name: 'Explore', href: '/explore' },
    { name: 'Matches', href: '/matches' },
    { name: 'Graph', href: '/graph' },
  ];

  const isActive = (href: string) => {
    if (href === '/explore') return pathname === '/explore' || pathname?.startsWith('/skills') || pathname?.startsWith('/roles') || pathname?.startsWith('/companies');
    return pathname === href;
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        height: 'var(--navbar-height, 64px)',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--navbar-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 32px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        className="navbar-container"
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--surface-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="3" cy="3" r="1.5" fill="var(--accent-primary)" />
              <circle cx="11" cy="3" r="1.5" fill="var(--accent-primary)" />
              <circle cx="7" cy="11" r="1.5" fill="var(--accent-primary)" />
              <line x1="3" y1="3" x2="7" y2="11" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.6" />
              <line x1="11" y1="3" x2="7" y2="11" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.6" />
              <line x1="3" y1="3" x2="11" y2="3" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.6" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            CareerGraph
          </span>
        </Link>

        {/* Center Nav — Desktop only */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
          className="hide-mobile"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '6px 14px',
                  fontSize: '14px',
                  fontWeight: active ? 500 : 400,
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  borderBottom: active ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  transition: 'color 0.12s',
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right side — Desktop */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              style={{
                background: 'none',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '7px',
                transition: 'background-color 0.15s, color 0.15s, border-color 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.borderColor = 'var(--border-hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              {theme === 'dark' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          )}

          <Link
            href="/matches"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#fff',
              textDecoration: 'none',
              backgroundColor: 'var(--accent-primary)',
              borderRadius: '7px',
              border: 'none',
              transition: 'background-color 0.15s',
              flexShrink: 0,
              height: '36px',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')}
          >
            Find my match
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Mobile right side: theme + hamburger */}
        <div className="show-mobile" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              style={{
                background: 'none',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
              }}
            >
              {theme === 'dark' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '0',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '40px',
              width: '40px',
              flexShrink: 0,
            }}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          style={{
            position: 'absolute',
            top: 'var(--navbar-height, 64px)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--surface-color)',
            borderBottom: '1px solid var(--border-color)',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            boxShadow: 'var(--shadow-md)',
            zIndex: 49,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '12px 16px',
                fontSize: '16px',
                color: isActive(link.href) ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isActive(link.href) ? 500 : 400,
                textDecoration: 'none',
                borderRadius: '8px',
                backgroundColor: isActive(link.href) ? 'var(--surface-hover)' : 'transparent',
                display: 'block',
                minHeight: '48px',
                lineHeight: '24px',
              }}
            >
              {link.name}
            </Link>
          ))}

          <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '8px', paddingTop: '12px' }}>
            <Link
              href="/matches"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '14px',
                fontSize: '16px',
                fontWeight: 500,
                color: '#fff',
                textDecoration: 'none',
                backgroundColor: 'var(--accent-primary)',
                borderRadius: '8px',
                textAlign: 'center',
                display: 'block',
                minHeight: '48px',
                lineHeight: '20px',
              }}
            >
              Find my match →
            </Link>
          </div>
        </nav>
      )}

      <style>{`
        :root { --navbar-height: 64px; }
        @media (max-width: 768px) {
          :root { --navbar-height: 60px; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .navbar-container { padding: 0 16px !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
