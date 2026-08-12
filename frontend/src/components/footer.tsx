'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)',
        padding: '24px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
        className="footer-container"
      >
        {/* Left */}
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
          CareerGraph — Graph-Powered Career Intelligence
        </p>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {[
            { label: 'Explore', href: '/explore' },
            { label: 'Matches', href: '/matches' },
            { label: 'Graph', href: '/graph' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.12s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-container { padding: 0 16px !important; }
        }
      `}</style>
    </footer>
  );
}
