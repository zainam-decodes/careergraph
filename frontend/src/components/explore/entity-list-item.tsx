'use client';

import Link from 'next/link';
import { GraphNode, EntityType } from '@/lib/types';

interface EntityListItemProps {
  node: GraphNode;
}

const TYPE_COLORS: Record<EntityType, { text: string; bg: string; border: string }> = {
  Skill:   { text: 'var(--accent-primary)', bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
  Role:    { text: 'var(--role-color)', bg: 'var(--role-bg)', border: 'var(--role-border)' },
  Company: { text: 'var(--company-color)', bg: 'var(--company-bg)', border: 'var(--company-border)' },
  Project: { text: 'var(--project-color)', bg: 'var(--project-bg)', border: 'var(--project-border)' },
};

export function EntityListItem({ node }: EntityListItemProps) {
  const colors = TYPE_COLORS[node.type] ?? TYPE_COLORS['Skill'];

  const href = (() => {
    if (node.type === 'Skill') {
      return `/skills/${encodeURIComponent(node.label)}`;
    }
    // For Roles, Companies, Projects, fallback to graph explorer since there are no dedicated backend endpoints
    return `/graph?entity=${encodeURIComponent(node.label)}`;
  })();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '32px',
        padding: '24px 28px',
        borderBottom: '1px solid var(--border-color)',
        minHeight: '88px',
        transition: 'background-color 0.12s',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-hover)')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      {/* LEFT: type badge + name + meta */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flex: 1, minWidth: 0 }}>

        {/* Type badge — pinned width so text aligns */}
        <div className="entity-item-badge" style={{ flexShrink: 0, paddingTop: '3px', width: '68px' }}>
          <span style={{
            display: 'inline-block',
            padding: '3px 9px',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.02em',
            borderRadius: '4px',
            color: colors.text,
            backgroundColor: colors.bg,
            border: `1px solid ${colors.border}`,
          }}>
            {node.type}
          </span>
        </div>

        {/* Text block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Entity name — visually dominant */}
          <Link
            href={href}
            style={{
              display: 'block',
              fontSize: '17px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
              marginBottom: '5px',
              wordBreak: 'break-word',
            }}
          >
            {node.label}
          </Link>

          {/* Category */}
          {node.category && (
            <p style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              marginBottom: node.description ? '8px' : '0',
              lineHeight: 1.4,
            }}>
              {node.category}
            </p>
          )}

          {/* Description */}
          {node.description && (
            <p style={{
              fontSize: '14px',
              color: 'var(--text-muted)',
              lineHeight: 1.55,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {node.description}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT: action */}
      <div className="entity-item-action" style={{ flexShrink: 0 }}>
        <Link
          href={href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            height: '44px',
            padding: '0 16px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            whiteSpace: 'nowrap',
            transition: 'all 0.12s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = colors.text;
            e.currentTarget.style.borderColor = colors.text;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}
        >
          Explore
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
