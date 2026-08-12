'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { GraphData } from '@/lib/types';
import { GraphExplorer } from '@/components/graph/graph-explorer';

/**
 * Inner component that can safely use useSearchParams() within a Suspense boundary.
 */
function GraphPageInner() {
  const searchParams = useSearchParams();
  const initialEntity = searchParams.get('entity');

  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentEntity, setCurrentEntity] = useState<string | null>(initialEntity);

  /**
   * Fetch the graph neighborhood for a named entity from GET /api/graph?entity=<name>.
   * Called by GraphExplorer when the user submits a search.
   */
  const loadGraph = async (entityName: string) => {
    if (!entityName.trim()) return;
    setIsLoading(true);
    setError(null);
    setCurrentEntity(entityName);
    try {
      const data = await api.getGraph(entityName);
      setGraphData(data);
    } catch {
      setError('Unable to load graph data. Please try again.');
      setGraphData({ nodes: [], edges: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (currentEntity) loadGraph(currentEntity);
  };

  useEffect(() => {
    if (initialEntity) {
      loadGraph(initialEntity);
    }
  }, [initialEntity]);

  return (
    <div style={{
      width: '100%',
      height: 'calc(100dvh - var(--navbar-height, 64px))',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <GraphExplorer
        initialData={graphData}
        isLoading={isLoading}
        error={error}
        onRetry={handleRetry}
        onEntitySearch={loadGraph}
        currentEntity={currentEntity}
      />
    </div>
  );
}

/**
 * Graph page — wraps the inner component in Suspense as required
 * by Next.js when useSearchParams() is used inside a 'use client' page.
 */
export default function GraphPage() {
  return (
    <Suspense fallback={
      <div style={{
        width: '100%',
        height: 'calc(100dvh - var(--navbar-height, 64px))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        fontSize: '14px',
      }}>
        Loading graph...
      </div>
    }>
      <GraphPageInner />
    </Suspense>
  );
}
