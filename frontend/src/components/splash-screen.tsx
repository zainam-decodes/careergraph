'use client';

import { useEffect, useState } from 'react';

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // Only show once per session
    const seen = sessionStorage.getItem('cg-splash-seen');
    if (seen) {
      setVisible(false);
      return;
    }

    // Hide after a short delay — just enough to feel intentional, not forced
    const timer = setTimeout(() => {
      setHiding(true);
      const removeTimer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('cg-splash-seen', '1');
      }, 380);
      return () => clearTimeout(removeTimer);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`splash-screen${hiding ? ' hiding' : ''}`} role="status" aria-label="Loading CareerGraph">
      {/* Logo mark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--surface-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <circle cx="3" cy="3" r="1.5" fill="var(--accent-primary)" />
            <circle cx="11" cy="3" r="1.5" fill="var(--accent-primary)" />
            <circle cx="7" cy="11" r="1.5" fill="var(--accent-primary)" />
            <line x1="3" y1="3" x2="7" y2="11" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.6" />
            <line x1="11" y1="3" x2="7" y2="11" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.6" />
            <line x1="3" y1="3" x2="11" y2="3" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.6" />
          </svg>
        </div>
        <span style={{
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}>
          CareerGraph
        </span>
      </div>

      <p style={{
        fontSize: '14px',
        color: 'var(--text-muted)',
        textAlign: 'center',
        maxWidth: '300px',
        lineHeight: 1.5,
      }}>
        Explore the connections between skills, careers and companies.
      </p>

      {/* Subtle progress bar */}
      <div style={{
        width: '120px',
        height: '2px',
        backgroundColor: 'var(--border-color)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginTop: '8px',
      }}>
        <div style={{
          height: '100%',
          backgroundColor: 'var(--accent-primary)',
          borderRadius: '2px',
          animation: 'progress-bar 0.9s ease forwards',
        }} />
      </div>
    </div>
  );
}
