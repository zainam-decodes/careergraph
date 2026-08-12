import { GRAPH_NODES, GRAPH_EDGES } from './dataset';
import { GraphData, GraphNode, GraphEdge } from '@/lib/types';

export async function fetchFullGraph(): Promise<GraphData> {
  return {
    nodes: GRAPH_NODES,
    edges: GRAPH_EDGES
  };
}

export async function fetchGraphNeighborhood(nodeId: string): Promise<GraphData> {
  const targetId = nodeId.toLowerCase();

  // Find all edges connected to target node
  const connectedEdges = GRAPH_EDGES.filter(
    e => e.source.toLowerCase() === targetId || e.target.toLowerCase() === targetId
  );

  const connectedNodeIds = new Set<string>();
  connectedNodeIds.add(targetId);
  connectedEdges.forEach(e => {
    connectedNodeIds.add(e.source.toLowerCase());
    connectedNodeIds.add(e.target.toLowerCase());
  });

  const connectedNodes = GRAPH_NODES.filter(n => connectedNodeIds.has(n.id.toLowerCase()));

  return {
    nodes: connectedNodes,
    edges: connectedEdges
  };
}

export async function fetchFilteredGraph(
  query?: string,
  nodeTypes?: string[]
): Promise<GraphData> {
  let filteredNodes = [...GRAPH_NODES];

  if (nodeTypes && nodeTypes.length > 0 && !nodeTypes.includes('All')) {
    filteredNodes = filteredNodes.filter(n => nodeTypes.includes(n.type));
  }

  if (query) {
    const q = query.toLowerCase();
    filteredNodes = filteredNodes.filter(n => 
      n.label.toLowerCase().includes(q) ||
      n.type.toLowerCase().includes(q) ||
      (n.category && n.category.toLowerCase().includes(q))
    );
  }

  const validNodeIds = new Set(filteredNodes.map(n => n.id.toLowerCase()));

  const filteredEdges = GRAPH_EDGES.filter(e => 
    validNodeIds.has(e.source.toLowerCase()) && validNodeIds.has(e.target.toLowerCase())
  );

  return {
    nodes: filteredNodes,
    edges: filteredEdges
  };
}
