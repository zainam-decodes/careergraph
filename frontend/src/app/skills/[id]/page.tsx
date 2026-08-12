'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface SkillDetail {
  skill: string;
  description?: string;
  roles: string[];
}

export default function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [skillDetail, setSkillDetail] = useState<SkillDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // The route param is the skill name (URL-encoded by the skills listing page)
  const skillName = decodeURIComponent(resolvedParams.id);

  useEffect(() => {
    async function loadSkill() {
      setIsLoading(true);
      setError(null);
      try {
        // GET /api/skills/{skill_name} — real data from CognoDB
        const data = await api.getSkillByName(skillName);
        setSkillDetail(data);
      } catch {
        setError('Unable to load skill details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    loadSkill();
  }, [skillName]);

  if (isLoading) {
    return (
      <div className="page-container" style={{ padding: '80px 32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '15px' }}>
        Loading skill details...
      </div>
    );
  }

  if (error || !skillDetail) {
    return (
      <div className="page-container" style={{ padding: '80px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
          {error ? 'Unable to load skill' : 'Skill Not Found'}
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          {error ?? `No skill matching "${skillName}" was found in the graph.`}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/skills"
            style={{ fontSize: '14px', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 500 }}
          >
            ← Return to Skills Catalog
          </Link>
          {error && (
            <button
              onClick={() => window.location.reload()}
              style={{ fontSize: '14px', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ paddingBottom: '64px' }}>

      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <div style={{ paddingTop: '40px', marginBottom: '24px' }}>
        <Link
          href="/skills"
          style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.12s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          ← Back to Skills
        </Link>
      </div>

      {/* ── Page Header ───────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '24px',
          paddingBottom: '32px',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '40px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <span
            style={{
              display: 'inline-block',
              padding: '3px 10px',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              borderRadius: '4px',
              color: 'var(--accent-primary)',
              backgroundColor: 'var(--accent-bg)',
              border: '1px solid var(--accent-border)',
              marginBottom: '12px',
            }}
          >
            Skill
          </span>

          <h1
            style={{
              fontSize: 'clamp(32px, 4vw, 40px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '8px',
            }}
          >
            {skillDetail.skill}
          </h1>

          {skillDetail.description && (
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', margin: 0, maxWidth: '560px', lineHeight: 1.6 }}>
              {skillDetail.description}
            </p>
          )}
        </div>

        <Link
          href={`/graph?entity=${encodeURIComponent(skillDetail.skill)}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            height: '42px',
            padding: '0 20px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--accent-primary)',
            textDecoration: 'none',
            borderRadius: '7px',
            border: '1px solid var(--accent-border)',
            backgroundColor: 'var(--accent-bg)',
            transition: 'opacity 0.15s',
            marginTop: '8px',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          View in graph
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* ── Connected Roles ───────────────────────────────── */}
      <div
        style={{
          backgroundColor: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          padding: '28px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', margin: 0 }}>
            Connected roles
          </p>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {skillDetail.roles.length} {skillDetail.roles.length === 1 ? 'role' : 'roles'}
          </span>
        </div>

        {skillDetail.roles.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {skillDetail.roles.map((roleName, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '14px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  transition: 'border-color 0.12s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--role-color)', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {roleName}
                  </span>
                </div>
                <Link
                  href={`/graph?entity=${encodeURIComponent(roleName)}`}
                  style={{
                    fontSize: '13px',
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    opacity: 0.8,
                  }}
                >
                  View in graph →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
            No roles currently connected to this skill in the graph.
          </p>
        )}
      </div>

      {/* ── Find Matches CTA ─────────────────────────────── */}
      <div
        style={{
          backgroundColor: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          padding: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Have this skill?
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Go to Career Matches to see which roles you qualify for.
          </p>
        </div>
        <Link
          href="/matches"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            height: '40px',
            padding: '0 18px',
            borderRadius: '7px',
            border: 'none',
            backgroundColor: 'var(--accent-primary)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Find career matches
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

    </div>
  );
}
