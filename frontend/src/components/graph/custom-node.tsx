'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { EntityType } from '@/lib/types';

interface CustomNodeData {
  label: string;
  type: EntityType;
  category?: string;
  isSelected?: boolean;
  isDimmed?: boolean;
}

const TYPE_COLORS: Record<EntityType, { accent: string; selectedBg: string; selectedBorder: string }> = {
  Skill:   { accent: 'var(--accent-primary)', selectedBg: 'var(--accent-bg)', selectedBorder: 'var(--accent-primary)' },
  Role:    { accent: 'var(--role-color)', selectedBg: 'var(--role-bg)',  selectedBorder: 'var(--role-color)' },
  Company: { accent: 'var(--company-color)', selectedBg: 'var(--company-bg)',  selectedBorder: 'var(--company-color)' },
  Project: { accent: 'var(--project-color)', selectedBg: 'var(--project-bg)',  selectedBorder: 'var(--project-color)' },
};

export const CustomNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as CustomNodeData;
  const isSelected = selected || nodeData.isSelected;
  const isDimmed = nodeData.isDimmed;
  const c = TYPE_COLORS[nodeData.type] ?? TYPE_COLORS['Skill'];

  // For unselected state, we use transparent borders or subtle borders based on theme
  const borderColor = isSelected ? c.selectedBorder : 'var(--border-color)';
  const backgroundColor = isSelected ? c.selectedBg : 'var(--surface-color)';

  return (
    <div
      style={{
        minWidth: '160px',
        maxWidth: '220px',
        padding: '14px 18px',
        borderRadius: '8px',
        border: `1.5px solid ${borderColor}`,
        backgroundColor,
        boxShadow: isSelected ? `0 0 0 3px ${c.selectedBorder}22, 0 4px 16px var(--shadow-color)` : '0 2px 8px var(--shadow-color)',
        opacity: isDimmed ? 0.2 : 1,
        cursor: 'pointer',
        transition: 'opacity 0.15s, border-color 0.15s, box-shadow 0.15s',
        userSelect: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ width: 8, height: 8, backgroundColor: 'var(--border-color)', border: `1.5px solid ${c.accent}`, top: -4, opacity: 0.6 }}
      />

      {/* Type label */}
      <p style={{
        fontSize: '10px',
        fontWeight: 600,
        color: c.accent,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: '6px',
        lineHeight: 1,
      }}>
        {nodeData.type}
      </p>

      {/* Node name */}
      <p style={{
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        lineHeight: 1.35,
        wordBreak: 'break-word',
        letterSpacing: '-0.01em',
      }}>
        {nodeData.label}
      </p>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ width: 8, height: 8, backgroundColor: 'var(--border-color)', border: `1.5px solid ${c.accent}`, bottom: -4, opacity: 0.6 }}
      />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
