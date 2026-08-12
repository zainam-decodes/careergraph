'use client';

import Link from 'next/link';
import { SkillMatchResult } from '@/lib/types';

interface MatchCardProps {
  result: SkillMatchResult;
}

function getScoreStyle(score: number) {
  if (score >= 70) return { text: 'var(--role-color)', border: 'var(--role-border)', bg: 'var(--role-bg)' };
  if (score >= 40) return { text: 'var(--company-color)', border: 'var(--company-border)',  bg: 'var(--company-bg)' };
  return             { text: 'var(--text-secondary)', border: 'var(--border-color)', bg: 'transparent' };
}

function SkillList({ skills, limit = 6, isMatched = false }: { skills: string[]; limit?: number; isMatched?: boolean }) {
  const visible = skills.slice(0, limit);
  const overflow = skills.length - limit;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {visible.map((s, i) => (
        <span key={i} style={{
          display: 'inline-block',
          padding: '4px 10px',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          backgroundColor: 'var(--surface-hover)',
          border: isMatched ? '1px solid var(--accent-border)' : '1px solid var(--border-color)',
          borderRadius: '4px',
        }}>
          {s}
        </span>
      ))}
      {overflow > 0 && (
        <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center' }}>
          +{overflow} more
        </span>
      )}
    </div>
  );
}

export function MatchCard({ result }: MatchCardProps) {
  const score = getScoreStyle(result.matchPercentage);

  return (
    <div style={{
      backgroundColor: 'var(--surface-color)',
      border: '1px solid var(--border-color)',
      borderRadius: '10px',
      padding: '28px',
      transition: 'border-color 0.15s',
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
    >
      {/* ── Top: Role name + Score ─────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '6px',
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            margin: 0,
            wordBreak: 'break-word',
          }}>
            <Link href={`/graph?entity=${encodeURIComponent(result.roleTitle)}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {result.roleTitle}
            </Link>
          </h3>
        </div>

        <div style={{
          flexShrink: 0,
          padding: '5px 14px',
          borderRadius: '6px',
          border: `1px solid ${score.border}`,
          backgroundColor: score.bg,
          fontSize: '13px',
          fontWeight: 600,
          color: score.text,
          whiteSpace: 'nowrap',
        }}>
          {result.matchPercentage}% match
        </div>
      </div>

      {/* Department */}
      <p style={{
        fontSize: '14px',
        color: 'var(--text-secondary)',
        marginBottom: '24px',
      }}>
        {result.department}
      </p>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border-color)', marginBottom: '24px' }} />

      {/* ── Skills Grid ────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        marginBottom: '24px',
      }}>
        <div>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--role-color)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Matched skills
          </p>
          {result.matchedSkills.length > 0
            ? <SkillList skills={result.matchedSkills} isMatched={true} />
            : <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>No skills matched yet</p>
          }
        </div>

        {result.missingSkills.length > 0 || result.matchPercentage < 100 ? (
          <div>
            <p style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--company-color)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Skill gaps
            </p>
            {result.missingSkills.length > 0 ? (
              <SkillList skills={result.missingSkills} limit={4} />
            ) : (
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>No additional required skills</p>
            )}
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '13px', color: 'var(--role-color)', fontWeight: 500, marginTop: '26px' }}>✓ Full skill match</p>
          </div>
        )}
      </div>

      {/* ── Footer ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {result.connectedCompanies.length > 0 ? (
            <>
              <span>{result.connectedCompanies.length} connected {result.connectedCompanies.length === 1 ? 'company' : 'companies'}</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {' '}— {result.connectedCompanies.slice(0, 3).join(', ')}
              </span>
            </>
          ) : (
            'No connected companies'
          )}
        </p>

        <Link
          href={`/graph?entity=${encodeURIComponent(result.roleTitle)}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            height: '40px',
            padding: '0 16px',
            borderRadius: '6px',
            backgroundColor: 'var(--accent-bg)',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--accent-primary)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          View career path
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
