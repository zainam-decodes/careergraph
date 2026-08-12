'use client';

import Link from 'next/link';

const features = [
  {
    title: 'Match skills to roles',
    description: 'Select the skills you have. See which roles are within reach and exactly what you need to close the gap.',
  },
  {
    title: 'Explore career connections',
    description: 'Discover how Python connects to machine learning roles, which companies hire for them, and what projects build those skills.',
  },
  {
    title: 'Find your skill gaps',
    description: 'Identify the specific skills separating you from a perfect role match — and get a clear path to acquire them.',
  },
];

const steps = [
  { step: '1', label: 'Browse', description: 'Explore skills, roles, and companies in the catalog.' },
  { step: '2', label: 'Select', description: 'Choose the skills you already have.' },
  { step: '3', label: 'Match', description: 'See which career roles fit your profile.' },
];

export default function LandingPage() {
  return (
    <div style={{ width: '100%' }}>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        style={{
          width: '100%',
          minHeight: 'calc(100dvh - var(--navbar-height, 64px))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            marginBottom: '20px',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
        >
          Graph-Powered Career Intelligence
        </p>

        <h1
          style={{
            fontSize: 'clamp(32px, 6vw, 54px)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1.12,
            maxWidth: '680px',
            margin: '0 auto 20px',
          }}
        >
          Discover where your skills connect.
        </h1>

        <p
          style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            maxWidth: '520px',
            margin: '0 auto 40px',
          }}
        >
          CareerGraph maps the relationships between skills, roles, projects, and companies — so you can find realistic career paths.
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '420px',
          margin: '0 auto',
        }}>
          <Link
            href="/matches"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '48px',
              padding: '0 28px',
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              fontWeight: 500,
              fontSize: '15px',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background-color 0.15s',
              flex: '1 1 auto',
              minWidth: '180px',
              maxWidth: '240px',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')}
          >
            Find my match
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link
            href="/explore"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '48px',
              padding: '0 28px',
              backgroundColor: 'var(--surface-color)',
              color: 'var(--text-primary)',
              fontWeight: 500,
              fontSize: '15px',
              borderRadius: '8px',
              textDecoration: 'none',
              border: '1px solid var(--border-color)',
              transition: 'background-color 0.15s, border-color 0.15s',
              flex: '1 1 auto',
              minWidth: '180px',
              maxWidth: '240px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--surface-color)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            Explore the catalog
          </Link>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--surface-color)',
          padding: '32px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(32px, 8vw, 80px)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: '50+', label: 'Skills mapped' },
            { num: '30+', label: 'Career roles' },
            { num: '25+', label: 'Companies' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center', flex: '0 1 auto' }}>
              <p style={{
                fontSize: 'clamp(22px, 3vw, 28px)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                margin: 0,
              }}>
                {stat.num}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works (3 steps) ──────────────────────────── */}
      <section
        className="page-container"
        style={{ paddingTop: '72px', paddingBottom: '56px' }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '12px',
            color: 'var(--text-primary)',
          }}
        >
          How it works
        </h2>
        <p style={{
          textAlign: 'center',
          marginBottom: '48px',
          maxWidth: '400px',
          margin: '0 auto 48px',
        }}>
          Three steps to understand your career potential.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '0',
            maxWidth: '860px',
            margin: '0 auto',
            flexWrap: 'wrap',
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.step}
              style={{
                flex: '1 1 200px',
                padding: '32px 28px',
                position: 'relative',
                borderRight: i < steps.length - 1 ? '1px solid var(--border-color)' : 'none',
              }}
            >
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}>
                Step {s.step}
              </div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '18px' }}>
                {s.label}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.65 }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section
        className="page-container"
        style={{ paddingTop: '16px', paddingBottom: '80px' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{
                padding: '28px',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                backgroundColor: 'var(--surface-color)',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--accent-bg)',
                  border: '1px solid var(--accent-border)',
                  color: 'var(--accent-primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                {i + 1}
              </div>
              <h3
                style={{
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                {f.title}
              </h3>
              <p style={{ margin: 0, fontSize: '14px' }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid var(--border-color)',
          padding: '64px 24px',
          textAlign: 'center',
          backgroundColor: 'var(--surface-color)',
        }}
      >
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
          Ready to explore your career graph?
        </h2>
        <p style={{ maxWidth: '440px', margin: '0 auto 32px' }}>
          Select your skills and discover which roles and companies you connect to.
        </p>
        <Link
          href="/matches"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            height: '48px',
            padding: '0 32px',
            backgroundColor: 'var(--accent-primary)',
            color: '#fff',
            fontWeight: 500,
            fontSize: '15px',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'background-color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')}
        >
          Get started
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>
    </div>
  );
}
