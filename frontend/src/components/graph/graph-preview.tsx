'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';

interface PreviewNode {
  id: string;
  label: string;
  type: 'Skill' | 'Role' | 'Company';
  meta: string;
}

interface PreviewEdge {
  from: string;
  to: string;
  relation: 'RELATED_TO' | 'REQUIRES' | 'OFFERS';
}

export function GraphPreview() {
  const [activeNode, setActiveNode] = useState<string>('ml-engineer');

  const nodes: PreviewNode[] = [
    { id: 'python', label: 'Python', type: 'Skill', meta: 'Programming Language' },
    { id: 'machine-learning', label: 'Machine Learning', type: 'Skill', meta: 'AI Core Domain' },
    { id: 'ml-engineer', label: 'ML Engineer', type: 'Role', meta: 'Engineering & Systems' },
    { id: 'nvidia', label: 'NVIDIA', type: 'Company', meta: 'Hardware & AI Computing' },
  ];

  const edges: PreviewEdge[] = [
    { from: 'python', to: 'machine-learning', relation: 'RELATED_TO' },
    { from: 'machine-learning', to: 'ml-engineer', relation: 'REQUIRES' },
    { from: 'ml-engineer', to: 'nvidia', relation: 'OFFERS' },
  ];

  const getNodeColor = (type: PreviewNode['type']) => {
    switch (type) {
      case 'Skill': return { bg: 'bg-[#6E8CFF]/10', border: 'border-[#6E8CFF]/40', text: 'text-[#6E8CFF]', dot: 'bg-[#6E8CFF]' };
      case 'Role': return { bg: 'bg-[#36BF7F]/10', border: 'border-[#36BF7F]/40', text: 'text-[#36BF7F]', dot: 'bg-[#36BF7F]' };
      case 'Company': return { bg: 'bg-[#E09F3E]/10', border: 'border-[#E09F3E]/40', text: 'text-[#E09F3E]', dot: 'bg-[#E09F3E]' };
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-lg border border-[#24292F] bg-[#111417] p-6 sm:p-8 shadow-2xl">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between border-b border-[#24292F] pb-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#6E8CFF]"></span>
          <span className="font-mono text-xs uppercase tracking-wider text-[#98A1AC]">
            Interactive Traversal Topology
          </span>
        </div>
        <Link 
          href="/graph" 
          className="group inline-flex items-center gap-1 text-xs text-[#98A1AC] hover:text-[#6E8CFF] transition-colors"
        >
          <span>Open Full Graph Explorer</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Graph Visual Nodes Flow */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 relative py-4">
        
        {nodes.map((node, index) => {
          const style = getNodeColor(node.type);
          const isSelected = activeNode === node.id;
          const nextEdge = edges.find(e => e.from === node.id);

          return (
            <div key={node.id} className="flex flex-col md:flex-row items-center w-full md:w-auto">
              
              {/* Node Card */}
              <button
                onClick={() => setActiveNode(node.id)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-md border text-left transition-all duration-200 w-full md:w-48 ${
                  isSelected
                    ? `${style.bg} ${style.border} ring-1 ring-[#6E8CFF]/50 scale-[1.02]`
                    : 'bg-[#15191D] border-[#24292F] hover:border-[#6E8CFF]/30'
                }`}
              >
                <div className={`h-2 w-2 rounded-full ${style.dot} shrink-0`}></div>
                <div>
                  <div className="text-xs font-semibold text-[#F2F4F7] tracking-tight">{node.label}</div>
                  <div className="text-[10px] font-mono text-[#69727D]">{node.type}</div>
                </div>
              </button>

              {/* Edge Connecting Arrow */}
              {nextEdge && (
                <div className="flex flex-col items-center justify-center my-2 md:my-0 md:mx-3 text-center">
                  <div className="font-mono text-[9px] text-[#69727D] uppercase tracking-wider mb-1 px-1 bg-[#111417]">
                    {nextEdge.relation}
                  </div>
                  {/* Horizontal Line on MD, Vertical Line on mobile */}
                  <div className="hidden md:flex items-center text-[#24292F]">
                    <div className="w-8 h-[1px] bg-[#24292F]"></div>
                    <div className="text-[10px] text-[#98A1AC] -ml-1">➔</div>
                  </div>
                  <div className="flex md:hidden flex-col items-center text-[#24292F]">
                    <div className="h-4 w-[1px] bg-[#24292F]"></div>
                    <div className="text-[10px] text-[#98A1AC] -mt-1">↓</div>
                  </div>
                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* Selected Node Details Bar */}
      {activeNode && (
        <div className="mt-8 pt-4 border-t border-[#24292F] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#98A1AC] gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-[#6E8CFF]">Target Node:</span>
            <span className="font-semibold text-white">
              {nodes.find(n => n.id === activeNode)?.label}
            </span>
            <span className="text-[#69727D]">({nodes.find(n => n.id === activeNode)?.meta})</span>
          </div>
          <div className="font-mono text-[11px] text-[#69727D]">
            Traversing 4 hops in CognoDB schema
          </div>
        </div>
      )}

    </div>
  );
}
