'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '@/lib/api';
import { GraphNode } from '@/lib/types';
import { EntityListItem } from '@/components/explore/entity-list-item';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';

const TABS = [
  { label: 'All',       value: 'All' },
  { label: 'Skills',    value: 'Skill' },
  { label: 'Roles',     value: 'Role' },
  { label: 'Companies', value: 'Company' },
  { label: 'Projects',  value: 'Project' },
];

export default function ExplorePage() {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  /**
   * Fetch entities from the real FastAPI backend.
   * Passes search + entity_type params so the backend does the filtering
   * against CognoDB — no client-side mock filtering.
   */
  const loadData = useCallback(async (search?: string, entityType?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await api.getExplore(search, entityType);
      setNodes(results);
    } catch {
      setError('Unable to connect to CareerGraph. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load — fetch all entities
  useEffect(() => { loadData(); }, [loadData]);

  // Debounced search: re-fetch from backend whenever search or tab changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const entityType = activeTab !== 'All' ? activeTab : undefined;
      loadData(searchQuery || undefined, entityType);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, activeTab, loadData]);

  // Tab counts are derived from the current result set
  // (backend already filtered by entity_type when a tab is active)
  const tabsWithCounts = TABS.map(t => ({
    ...t,
    count: t.value === 'All'
      ? nodes.length
      : nodes.filter(n => n.type === t.value).length,
  }));

  const isSearching = searchQuery.trim().length > 0;
  const hasResults  = nodes.length > 0;

  const handleRetry = () => {
    const entityType = activeTab !== 'All' ? activeTab : undefined;
    loadData(searchQuery || undefined, entityType);
  };

  return (
    <div className="page-container">

      {/* ── Page Header ─────────────────────────────────────── */}
      <div style={{ paddingTop: '48px', marginBottom: '32px', maxWidth: '900px' }}>
        <p style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          marginBottom: '10px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          Career Graph
        </p>
        <h1 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>
          Explore the career graph
        </h1>
        <p style={{ margin: 0, maxWidth: '480px' }}>
          Search skills, career roles, companies, and projects to see how they connect.
        </p>
      </div>

      {/* ── Search Bar ──────────────────────────────────────── */}
      <div style={{ marginBottom: '24px', maxWidth: '800px' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          {/* Icon */}
          <div style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--text-muted)',
            zIndex: 2,
          }}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11.5 11.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Input */}
          <label htmlFor="explore-search" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            Search skills, roles, companies or projects
          </label>
          <input
            type="text"
            id="explore-search"
            placeholder="Search skills, roles, companies, or projects..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              height: '48px',
              paddingLeft: '44px',
              paddingRight: searchQuery ? '44px' : '16px',
              backgroundColor: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '15px',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent-primary)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
          />

          {/* Clear */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px',
                minHeight: '32px',
                borderRadius: '4px',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 1.5l10 10M11.5 1.5l-10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Filter Tabs ─────────────────────────────────────── */}
      <div
        className="hide-scrollbar"
        role="tablist"
        aria-label="Filter by type"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          marginBottom: '8px',
          borderBottom: '1px solid var(--border-color)',
          overflowX: 'auto',
        }}
      >
        {tabsWithCounts.map(tab => {
          const active = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.value)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 14px',
                fontSize: '14px',
                fontWeight: active ? 500 : 400,
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                borderBottom: active ? '2px solid var(--accent-primary)' : '2px solid transparent',
                marginBottom: '-1px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.12s',
                minHeight: '44px',
              }}
            >
              {tab.label}
              {!isLoading && (
                <span style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  fontWeight: 400,
                  minWidth: '16px',
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Results count ───────────────────────────────────── */}
      {!isLoading && !error && (
        <div style={{ marginBottom: '12px', height: '24px', display: 'flex', alignItems: 'center' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            {nodes.length} {nodes.length === 1 ? 'result' : 'results'}
            {isSearching && ` for "${searchQuery}"`}
          </p>
        </div>
      )}
      {(isLoading || error) && <div style={{ height: '24px', marginBottom: '12px' }} />}

      {/* ── Results List ────────────────────────────────────── */}
      <div style={{
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: 'var(--surface-color)',
        marginBottom: '64px',
      }}>
        {error ? (
          <ErrorState
            title="Unable to connect to CareerGraph"
            description="Something went wrong while loading this information. Please check your connection and try again."
            onRetry={handleRetry}
          />
        ) : isLoading ? (
          <LoadingState variant="skeleton-list" message="Searching the career graph..." />
        ) : !hasResults && !isSearching ? (
          <EmptyState
            title="Start exploring"
            description="Search for a skill, role, company or project above to discover connections across the career graph."
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
          />
        ) : !hasResults && isSearching ? (
          <EmptyState
            title="No results found"
            description={`Nothing matched "${searchQuery}". Try a different skill, role, company or project name.`}
            action={{ label: 'Clear search', onClick: () => setSearchQuery('') }}
          />
        ) : (
          nodes.map(node => (
            <EntityListItem key={`${node.type}-${node.id}`} node={node} />
          ))
        )}
      </div>

    </div>
  );
}
