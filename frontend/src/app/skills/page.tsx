'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { GraphNode } from '@/lib/types';

const CATEGORIES = [
  { label: 'All', value: 'All' },
  { label: 'Programming', value: 'Programming' },
  { label: 'Data', value: 'Data' },
  { label: 'AI / ML', value: 'AI / ML' },
  { label: 'Cloud', value: 'Cloud' },
  { label: 'DevOps', value: 'DevOps' },
];

function matchesCategoryFilter(skillCategory: string, filterValue: string): boolean {
  if (filterValue === 'All') return true;

  const cat = skillCategory.toLowerCase();
  switch (filterValue) {
    case 'Programming':
      return cat.includes('programming') || cat.includes('frontend') || cat.includes('backend');
    case 'Data':
      return cat.includes('database') || cat.includes('analytics') || cat.includes('intelligence') || cat.includes('querying');
    case 'AI / ML':
      return cat.includes('artificial intelligence') || cat.includes('frameworks') || cat.includes('ml');
    case 'Cloud':
      return cat.includes('cloud');
    case 'DevOps':
      return cat.includes('devops') || cat.includes('containers') || cat.includes('security') || cat.includes('operating systems');
    default:
      return true;
  }
}

export default function SkillsCatalogPage() {
  const [skills, setSkills] = useState<GraphNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const loadSkills = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // GET /api/explore?entity_type=Skill — real data from CognoDB
      const data = await api.getExplore(undefined, 'Skill');
      setSkills(data);
    } catch {
      setError('Unable to connect to CareerGraph. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const filteredSkills = useMemo(() => {
    let list = skills;

    // Filter by Category (based on description since backend returns description not category)
    if (activeCategory !== 'All') {
      list = list.filter(s => matchesCategoryFilter(s.category ?? s.description ?? '', activeCategory));
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(s =>
        s.label.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q))
      );
    }

    return list;
  }, [skills, activeCategory, searchQuery]);

  return (
    <div style={{ width: '100%', maxWidth: '1180px', margin: '0 auto', padding: '0 32px' }}>

      {/* ── Page Header ─────────────────────────────────────── */}
      <div style={{ paddingTop: '48px', marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: 'clamp(32px, 4vw, 40px)',
            fontWeight: 600,
            color: '#F5F7FA',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}
        >
          Skills
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: '#9AA3AD',
            lineHeight: 1.6,
            maxWidth: '540px',
            margin: 0,
          }}
        >
          Browse skills and discover the roles, projects and companies connected to them.
        </p>
      </div>

      {/* ── Search Bar ──────────────────────────────────────── */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '760px' }}>

          {/* Search Icon */}
          <div
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              color: '#6B7280',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              height: '54px',
              paddingLeft: '48px',
              paddingRight: searchQuery ? '44px' : '16px',
              backgroundColor: '#111417',
              border: '1px solid #252A30',
              borderRadius: '8px',
              fontSize: '15px',
              color: '#F5F7FA',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#6E8CFF')}
            onBlur={(e) => (e.target.style.borderColor = '#252A30')}
          />

          {/* Clear button */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Category Filters ────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '4px',
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              style={{
                padding: '7px 14px',
                borderRadius: '6px',
                border: isActive ? '1px solid rgba(110, 140, 255, 0.4)' : '1px solid #252A30',
                backgroundColor: isActive ? 'rgba(110, 140, 255, 0.1)' : '#111417',
                color: isActive ? '#6E8CFF' : '#9AA3AD',
                fontSize: '13px',
                fontWeight: isActive ? 500 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.12s',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ── Result Count ────────────────────────────────────── */}
      {!isLoading && !error && (
        <div style={{ marginTop: '24px', marginBottom: '16px' }}>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
            {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'} from CognoDB
          </p>
        </div>
      )}

      {/* ── Skill Cards Grid ────────────────────────────────── */}
      <div style={{ marginBottom: '64px' }}>

        {/* LOADING STATE: 6 Skeleton cards */}
        {isLoading && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
              gap: '16px',
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: '170px',
                  backgroundColor: '#111417',
                  border: '1px solid #252A30',
                  borderRadius: '8px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '120px',
                      height: '20px',
                      backgroundColor: '#1E2328',
                      borderRadius: '4px',
                      marginBottom: '12px',
                    }}
                  />
                  <div
                    style={{
                      width: '160px',
                      height: '14px',
                      backgroundColor: '#181C21',
                      borderRadius: '4px',
                    }}
                  />
                </div>
                <div
                  style={{
                    width: '200px',
                    height: '14px',
                    backgroundColor: '#181C21',
                    borderRadius: '4px',
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {!isLoading && error && (
          <div
            style={{
              padding: '80px 24px',
              textAlign: 'center',
              border: '1px solid #252A30',
              borderRadius: '8px',
              backgroundColor: '#111417',
            }}
          >
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#F5F7FA', marginBottom: '8px' }}>
              Unable to load skills
            </p>
            <p style={{ fontSize: '14px', color: '#9AA3AD', marginBottom: '20px' }}>
              Please try again.
            </p>
            <button
              onClick={loadSkills}
              style={{
                padding: '8px 20px',
                borderRadius: '6px',
                border: '1px solid #252A30',
                backgroundColor: '#15191D',
                color: '#F5F7FA',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && !error && filteredSkills.length === 0 && (
          <div
            style={{
              padding: '80px 24px',
              textAlign: 'center',
              border: '1px solid #252A30',
              borderRadius: '8px',
              backgroundColor: '#111417',
            }}
          >
            <p style={{ fontSize: '16px', fontWeight: 500, color: '#9AA3AD', marginBottom: '8px' }}>
              No skills found
            </p>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px' }}>
              Try another search term or category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #252A30',
                backgroundColor: '#15191D',
                color: '#6E8CFF',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Clear search
            </button>
          </div>
        )}

        {/* RESULTS GRID */}
        {!isLoading && !error && filteredSkills.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
              gap: '16px',
            }}
          >
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  minHeight: '170px',
                  backgroundColor: '#111417',
                  border: '1px solid #252A30',
                  borderRadius: '8px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#343B45')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#252A30')}
              >
                {/* Top Content */}
                <div>
                  {/* Skill Name */}
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#F5F7FA',
                      letterSpacing: '-0.01em',
                      marginBottom: '8px',
                      lineHeight: 1.3,
                    }}
                  >
                    <Link
                      href={`/skills/${encodeURIComponent(skill.label)}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {skill.label}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#9AA3AD',
                      marginBottom: '20px',
                      lineHeight: 1.4,
                    }}
                  >
                    {skill.description ?? 'Skill from the CareerGraph'}
                  </p>
                </div>

                {/* Bottom Content: Action */}
                <div>
                  {/* Action Link */}
                  <div style={{ textAlign: 'right' }}>
                    <Link
                      href={`/skills/${encodeURIComponent(skill.label)}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#6E8CFF',
                        textDecoration: 'none',
                        transition: 'opacity 0.12s',
                      }}
                    >
                      Explore
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path
                          d="M2.5 6.5h8M7 3l3.5 3.5L7 10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
