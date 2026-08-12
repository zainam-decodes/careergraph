'use client';

import Link from 'next/link';
import { GraphNode, GraphEdge, EntityType } from '@/lib/types';

interface NodeDetailsPanelProps {
  node: GraphNode | null;
  edges: GraphEdge[];
  allNodes: GraphNode[];
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
}

const TYPE_COLORS: Record<EntityType, string> = {
  Skill: 'var(--accent-primary)',
  Role: 'var(--role-color)',
  Company: 'var(--company-color)',
  Project: 'var(--project-color)',
};

const TYPE_BGS: Record<EntityType, string> = {
  Skill: 'var(--accent-bg)',
  Role: 'var(--role-bg)',
  Company: 'var(--company-bg)',
  Project: 'var(--project-bg)',
};

// Use friendly labels instead of internal type names
const TYPE_LABELS: Record<EntityType, string> = {
  Skill: 'Skill',
  Role: 'Career Role',
  Company: 'Company',
  Project: 'Project',
};

function ConnectedList({ title, nodes, onSelectNode }: {
  title: string;
  nodes: GraphNode[];
  onSelectNode: (id: string) => void;
}) {
  if (nodes.length === 0) return null;
  return (
    <div style={{ marginBottom: '24px' }}>
      <p style={{
        fontSize: '11px',
        fontWeight: 600,
        color: 'var(--text-muted)',
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        marginBottom: '8px',
      }}>
        {title} <span style={{ fontWeight: 400, opacity: 0.7 }}>({nodes.length})</span>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {nodes.map(n => (
          <button
            key={n.id}
            onClick={() => onSelectNode(n.id)}
            style={{
              textAlign: 'left',
              padding: '9px 12px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'background-color 0.1s, border-color 0.1s',
              width: '100%',
              minHeight: '40px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            {n.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function NodeDetailsPanel({ node, edges, allNodes, onClose, onSelectNode }: NodeDetailsPanelProps) {
  if (!node) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        textAlign: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          backgroundColor: 'var(--surface-hover)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          marginBottom: '4px',
        }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="14" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="10" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="6" y1="6" x2="10" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <line x1="14" y1="6" x2="10" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <line x1="6" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
          </svg>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>
          Select a connection
        </p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6, maxWidth: '200px' }}>
          Click any item in the graph to see its connections and details.
        </p>
      </div>
    );
  }

  const accentColor = TYPE_COLORS[node.type];
  const accentBg = TYPE_BGS[node.type];
  const typeLabel = TYPE_LABELS[node.type];

  const getDetailPath = () => {
    switch (node.type) {
      case 'Skill': return `/skills/${node.id}`;
      case 'Role': return `/roles/${node.id}`;
      case 'Company': return `/companies/${node.id}`;
      default: return `/explore?q=${encodeURIComponent(node.label)}`;
    }
  };

  const connectedEdges = edges.filter(
    e => e.source.toLowerCase() === node.id.toLowerCase() || e.target.toLowerCase() === node.id.toLowerCase()
  );
  const connectedIds = new Set(connectedEdges.map(e =>
    e.source.toLowerCase() === node.id.toLowerCase() ? e.target.toLowerCase() : e.source.toLowerCase()
  ));
  const connectedNodes = allNodes.filter(n => connectedIds.has(n.id.toLowerCase()));

  const skills   = connectedNodes.filter(n => n.type === 'Skill');
  const roles    = connectedNodes.filter(n => n.type === 'Role');
  const companies = connectedNodes.filter(n => n.type === 'Company');
  const projects = connectedNodes.filter(n => n.type === 'Project');
  const totalConnections = connectedNodes.length;

  return (
    <div style={{
      height: '100%',
      backgroundColor: 'var(--surface-color)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid var(--border-color)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: '11px',
              fontWeight: 600,
              color: accentColor,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}>
              {typeLabel}
            </p>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              marginBottom: node.category ? '4px' : '0',
              wordBreak: 'break-word',
            }}>
              {node.label}
            </h2>
            {node.category && (
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{node.category}</p>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close details panel"
            style={{
              flexShrink: 0,
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.12s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--surface-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {node.description && (
          <p style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginTop: '10px',
          }}>
            {node.description}
          </p>
        )}

        {/* Connection count pill */}
        {totalConnections > 0 && (
          <div style={{
            marginTop: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 10px',
            borderRadius: '20px',
            backgroundColor: 'var(--surface-hover)',
            border: '1px solid var(--border-color)',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: accentColor, display: 'inline-block' }} />
            {totalConnections} connection{totalConnections !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Connections — scrollable */}
      <div className="hide-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        <ConnectedList title="Related skills"   nodes={skills}    onSelectNode={onSelectNode} />
        <ConnectedList title="Career roles"     nodes={roles}     onSelectNode={onSelectNode} />
        <ConnectedList title="Companies"        nodes={companies} onSelectNode={onSelectNode} />
        <ConnectedList title="Projects"         nodes={projects}  onSelectNode={onSelectNode} />
        {totalConnections === 0 && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              No connections visible in the current graph.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '6px 0 0', opacity: 0.7 }}>
              Try increasing the graph depth to see more.
            </p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border-color)', flexShrink: 0 }}>
        <Link
          href={getDetailPath()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            height: '42px',
            borderRadius: '7px',
            border: `1px solid ${accentColor}`,
            backgroundColor: accentBg,
            color: accentColor,
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          View full details
          <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
