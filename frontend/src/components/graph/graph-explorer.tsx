'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { GraphData, GraphNode } from '@/lib/types';
import { CustomNode } from './custom-node';
import { NodeDetailsPanel } from './node-details-panel';

interface GraphExplorerProps {
  initialData: GraphData;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  /** Called when the user submits an entity name to fetch from the backend */
  onEntitySearch?: (entityName: string) => void;
  /** The entity name currently displayed in the graph */
  currentEntity?: string | null;
}

const nodeTypes = { custom: CustomNode };

export function GraphExplorer({
  initialData,
  isLoading = false,
  error = null,
  onRetry,
  onEntitySearch,
  currentEntity = null,
}: GraphExplorerProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [entityInput, setEntityInput] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  // To handle light/dark mode for the graph background
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const rootTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setThemeMode(rootTheme as 'light' | 'dark');

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setThemeMode(document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'dark');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Reset type filter when new data arrives
  useEffect(() => {
    setSelectedType('All');
    setSelectedNodeId(null);
  }, [initialData]);

  // ── Node filtering ──────────────────────────────────────────
  const displayNodes = useMemo(() => {
    let nodes = initialData.nodes;

    if (selectedType !== 'All') {
      nodes = nodes.filter(n => n.type === selectedType);
    }

    return nodes;
  }, [initialData.nodes, selectedType]);

  // ── Edge filtering ──────────────────────────────────────────
  const displayEdges = useMemo(() => {
    const ids = new Set(displayNodes.map(n => n.id));
    return initialData.edges.filter(
      e => ids.has(e.source) && ids.has(e.target)
    );
  }, [displayNodes, initialData.edges]);

  // ── Connected node highlight ────────────────────────────────
  const connectedNodeIds = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    const s = new Set<string>([selectedNodeId]);
    initialData.edges.forEach(e => {
      if (e.source === selectedNodeId) s.add(e.target);
      if (e.target === selectedNodeId) s.add(e.source);
    });
    return s;
  }, [selectedNodeId, initialData.edges]);

  // ── Layout nodes in columns by type ────────────────────────
  const flowNodes: Node[] = useMemo(() => {
    const columnX: Record<string, number> = { Skill: 80, Role: 320, Company: 560, Project: 800 };
    const counts: Record<string, number> = {};

    return displayNodes.map(node => {
      const idx = counts[node.type] ?? 0;
      counts[node.type] = idx + 1;
      const x = columnX[node.type] ?? 80;
      const y = 60 + idx * 120;

      const isSelected = selectedNodeId === node.id;
      const isDimmed = selectedNodeId ? !connectedNodeIds.has(node.id) : false;

      return {
        id: node.id,
        type: 'custom',
        position: { x, y },
        data: { label: node.label, type: node.type, category: node.category, isSelected, isDimmed },
      };
    });
  }, [displayNodes, selectedNodeId, connectedNodeIds]);

  const flowEdges: Edge[] = useMemo(() => {
    const edgeColor = themeMode === 'light' ? '#E3E6EA' : '#2A3040';
    const highlightColor = themeMode === 'light' ? '#4F46E5' : '#6E8CFF';

    return displayEdges.map(edge => {
      const connected = selectedNodeId
        ? edge.source === selectedNodeId || edge.target === selectedNodeId
        : false;

      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: false,
        style: {
          stroke: connected ? highlightColor : edgeColor,
          strokeWidth: connected ? 2 : 1.2,
          opacity: selectedNodeId ? (connected ? 1 : 0.2) : 0.7,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 10,
          height: 10,
          color: connected ? highlightColor : edgeColor,
        },
      };
    });
  }, [displayEdges, selectedNodeId, themeMode]);

  const [nodes, setNodes, onNodesChange] = useNodesState(flowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowEdges);

  useEffect(() => {
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [flowNodes, flowEdges, setNodes, setEdges]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(prev => prev === node.id ? null : node.id);
  }, []);

  const selectedNodeObj = useMemo(() => {
    if (!selectedNodeId) return null;
    return initialData.nodes.find(n => n.id === selectedNodeId) ?? null;
  }, [selectedNodeId, initialData.nodes]);

  // ── Entity search submission ────────────────────────────────
  const handleEntitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    const name = entityInput.trim();
    if (name && onEntitySearch) {
      onEntitySearch(name);
    }
  };

  // ── Loading state ───────────────────────────────────────────
  if (isLoading) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-color)', flexDirection: 'column', gap: '12px' }}>
        <div style={{ width: '28px', height: '28px', border: '2px solid var(--border-color)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Loading connections for &ldquo;{currentEntity}&rdquo;...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Error state ─────────────────────────────────────────────
  if (error) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <div style={{ maxWidth: '400px', textAlign: 'center', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '40px', backgroundColor: 'var(--surface-color)' }}>
          <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Unable to load graph</p>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>{error}</p>
          {onRetry && (
            <button onClick={onRetry} style={{ padding: '10px 20px', borderRadius: '7px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-hover)', color: 'var(--text-primary)', fontSize: '14px', cursor: 'pointer' }}>
              Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  const isEmpty = initialData.nodes.length === 0 && !isLoading && !error;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: 'var(--bg-color)' }}>

      {/* ── Toolbar ──────────────────────────────────────────── */}
      <div style={{
        flexShrink: 0,
        backgroundColor: 'var(--surface-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        gap: '12px',
        overflowX: 'auto',
      }}
      className="hide-scrollbar"
      >
        {/* Title */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Graph Explorer
          </span>
          <span className="hide-mobile" style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '10px' }}>
            {currentEntity
              ? `Showing connections for "${currentEntity}"`
              : 'Search for a skill, role or company'}
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, minWidth: '16px' }} />

        {/* Entity Search Form */}
        <form onSubmit={handleEntitySearch} style={{ position: 'relative', flexShrink: 0, display: 'flex', gap: '6px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
              display: 'flex',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.3" />
                <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search graph (e.g. Python)..."
              value={entityInput}
              onChange={e => setEntityInput(e.target.value)}
              style={{
                width: '200px',
                height: '36px',
                paddingLeft: '30px',
                paddingRight: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                backgroundColor: 'var(--surface-hover)',
                fontSize: '13px',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--accent-primary)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
            />
          </div>
          <button
            type="submit"
            disabled={!entityInput.trim()}
            style={{
              height: '36px',
              padding: '0 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: entityInput.trim() ? 'var(--accent-primary)' : 'var(--surface-hover)',
              color: entityInput.trim() ? '#fff' : 'var(--text-muted)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: entityInput.trim() ? 'pointer' : 'not-allowed',
              flexShrink: 0,
              transition: 'all 0.12s',
            }}
          >
            Explore
          </button>
        </form>

        {/* Type filter */}
        <div className="hide-mobile" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          backgroundColor: 'var(--surface-hover)',
          padding: '3px',
          borderRadius: '7px',
          border: '1px solid var(--border-color)',
          flexShrink: 0,
        }}>
          {['All', 'Skill', 'Role', 'Company', 'Project'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                padding: '4px 12px',
                borderRadius: '5px',
                border: 'none',
                fontSize: '13px',
                fontWeight: selectedType === type ? 500 : 400,
                backgroundColor: selectedType === type ? 'var(--border-color)' : 'transparent',
                color: selectedType === type ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.1s',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Reset */}
        <button
          onClick={() => { setSelectedNodeId(null); setEntityInput(''); setSelectedType('All'); }}
          title="Reset filters"
          style={{
            height: '36px',
            padding: '0 12px',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            flexShrink: 0,
            transition: 'color 0.12s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M11 6.5A4.5 4.5 0 1 1 9.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M9 1v2.5H11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hide-mobile">Reset</span>
        </button>
      </div>

      {/* ── Workspace: graph + details ────────────────────────── */}
      <div
        className={selectedNodeObj ? 'graph-layout-active' : 'graph-layout-empty'}
        style={{
          flex: 1,
          display: 'grid',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >

        {/* Graph Canvas */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 0 }}>
          {isEmpty ? (
            /* ── Prompt: no entity searched yet ── */
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '32px', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M14.5 14.5L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                  Explore connections in the graph
                </p>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, maxWidth: '340px', lineHeight: 1.6 }}>
                  Type a skill, role, or company name in the search bar above and click <strong>Explore</strong> to see how it connects to the rest of the career graph.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Python', 'Machine Learning', 'Data Scientist', 'Google'].map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => { setEntityInput(suggestion); if (onEntitySearch) onEntitySearch(suggestion); }}
                    style={{
                      padding: '7px 14px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      backgroundColor: 'var(--surface-hover)',
                      color: 'var(--text-secondary)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.12s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'var(--accent-border)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : nodes.length === 0 ? (
            /* ── No nodes after filtering ── */
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '32px', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>No nodes found</p>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, maxWidth: '280px' }}>No connections matched the selected filter. Try a different type.</p>
              </div>
              <button
                onClick={() => setSelectedType('All')}
                style={{ marginTop: '4px', padding: '8px 20px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--surface-hover)', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
              >
                Show all types
              </button>
            </div>
          ) : (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.18 }}
              colorMode={themeMode}
              minZoom={0.2}
              maxZoom={2.5}
            >
              <Background variant={BackgroundVariant.Dots} gap={28} size={1} color="var(--graph-dot)" />
              <Controls position="bottom-left" />
              <Panel position="bottom-right" className="hide-mobile" style={{ display: 'flex', gap: '16px', background: 'var(--surface-color)', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }} /> Skill
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--role-color)' }} /> Role
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--company-color)' }} /> Company
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--project-color)' }} /> Project
                </div>
              </Panel>
            </ReactFlow>
          )}
        </div>

        {/* Details Panel */}
        {selectedNodeObj && (
          <div
            className="graph-inspector-panel"
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            }}
          >
            <NodeDetailsPanel
              node={selectedNodeObj}
              edges={initialData.edges}
              allNodes={initialData.nodes}
              onClose={() => setSelectedNodeId(null)}
              onSelectNode={id => setSelectedNodeId(id)}
            />
          </div>
        )}

      </div>

      <style>{`
        .graph-layout-empty { grid-template-columns: 1fr; }
        .graph-layout-active { grid-template-columns: minmax(0, 1fr) 340px; }
        .graph-inspector-panel { border-left: 1px solid var(--border-color); }

        @media (max-width: 768px) {
          .graph-layout-active {
            grid-template-columns: 1fr;
            grid-template-rows: minmax(0, 1fr) 50dvh;
          }
          .graph-inspector-panel {
            border-left: none;
            border-top: 1px solid var(--border-color);
            box-shadow: 0 -4px 16px var(--shadow-color);
            z-index: 10;
          }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
