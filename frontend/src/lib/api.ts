/**
 * CareerGraph API Client
 *
 * All data comes from the FastAPI backend (http://localhost:8000).
 * There are NO mock fallbacks — if the backend is unavailable, an error
 * is thrown so the UI can display a clear, honest error state.
 *
 * Architecture:
 *   Next.js  →  FastAPI  →  Neo4j Driver  →  CognoDB
 */

import { GraphData, GraphNode, GraphEdge, SkillMatchResult } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ─── Core request helper ────────────────────────────────────────────────────

/**
 * Sends a GET or POST request to the FastAPI backend.
 * Throws a readable Error if the request fails or the backend returns an error.
 */
async function request<T>(
  endpoint: string,
  options?: { method?: 'GET' | 'POST'; body?: unknown }
): Promise<T> {
  const method = options?.method ?? 'GET';

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    // Try to get a human-readable message from the backend
    let detail = `Request failed (${res.status})`;
    try {
      const json = await res.json();
      if (json?.detail) detail = json.detail;
    } catch {
      // ignore parse errors
    }
    throw new Error(detail);
  }

  return res.json() as Promise<T>;
}

// ─── Response shapes from FastAPI ───────────────────────────────────────────

interface ExploreResult {
  id: string;
  type: string;
  name: string;
  description?: string;
}

interface ExploreResponse {
  results: ExploreResult[];
  count: number;
}

interface SkillResponse {
  skill: string;
  description?: string;
  roles: string[];
}

interface MatchItem {
  role: string;
  description?: string;
  matching_skills: string[];
  missing_skills: string[];
  connected_companies: string[];
  match_percentage: number;
}

interface MatchesResponse {
  skills: string[];
  matches: MatchItem[];
}

interface GraphConnection {
  source_id: string;
  source_type: string;
  source_name: string;
  target_id: string;
  target_type: string;
  target_name: string;
}

interface GraphResponse {
  entity: string;
  connections: GraphConnection[];
}

// ─── Adapters: backend shapes → frontend types ──────────────────────────────

/** Maps an ExploreResult from the backend to a GraphNode for the frontend. */
function toGraphNode(item: ExploreResult): GraphNode {
  return {
    id: item.id,
    label: item.name,
    type: item.type as GraphNode['type'],
    description: item.description,
  };
}

/**
 * Maps the flat connections list from GET /api/graph into a GraphData object.
 * Deduplicates nodes so the same entity isn't added twice.
 */
function toGraphData(response: GraphResponse): GraphData {
  const nodesMap = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  response.connections.forEach((conn, idx) => {
    // Add source node
    if (!nodesMap.has(conn.source_id)) {
      nodesMap.set(conn.source_id, {
        id: conn.source_id,
        label: conn.source_name,
        type: conn.source_type as GraphNode['type'],
      });
    }
    // Add target node
    if (!nodesMap.has(conn.target_id)) {
      nodesMap.set(conn.target_id, {
        id: conn.target_id,
        label: conn.target_name,
        type: conn.target_type as GraphNode['type'],
      });
    }
    // Add edge
    edges.push({
      id: `e-${idx}`,
      source: conn.source_id,
      target: conn.target_id,
      type: 'RELATED_TO', // generic — backend doesn't return relationship type in this endpoint
    });
  });

  return {
    nodes: Array.from(nodesMap.values()),
    edges,
  };
}

/** Maps a MatchItem from the backend to a SkillMatchResult for MatchCard. */
function toSkillMatchResult(item: MatchItem): SkillMatchResult {
  // Slug the role name to a URL-friendly id
  const roleId = item.role.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return {
    roleId,
    roleTitle: item.role,
    department: item.description ?? '',
    matchPercentage: Math.round(item.match_percentage),
    matchedSkills: item.matching_skills,
    missingSkills: item.missing_skills || [],
    connectedCompanies: item.connected_companies || [],
    careerPathHop: [],      // backend does not return path hops in this endpoint
  };
}

// ─── Public API object ───────────────────────────────────────────────────────

export const api = {
  /**
   * Health check — verifies the backend + CognoDB are reachable.
   * Returns false if unreachable rather than throwing, so the UI
   * can show a status badge without crashing.
   */
  async getHealth(): Promise<{ status: string; database: string }> {
    try {
      return await request<{ status: string; database: string }>('/api/health');
    } catch {
      return { status: 'unavailable', database: 'unavailable' };
    }
  },

  /**
   * Explore — returns all entities or search results from CognoDB.
   * Maps to GraphNode[] for use in the Explore page list.
   */
  async getExplore(search?: string, entityType?: string): Promise<GraphNode[]> {
    const params = new URLSearchParams();
    if (search?.trim()) params.set('search', search.trim());
    if (entityType && entityType !== 'All') params.set('entity_type', entityType);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const data = await request<ExploreResponse>(`/api/explore${qs}`);
    return data.results.map(toGraphNode);
  },

  /**
   * Skill detail — returns info about a specific skill and its connected roles.
   */
  async getSkillByName(skillName: string): Promise<SkillResponse> {
    return request<SkillResponse>(`/api/skills/${encodeURIComponent(skillName)}`);
  },

  /**
   * Career matches — sends selected skill names to the backend.
   * Returns a list of matching roles ordered by match percentage.
   *
   * @param skillNames Display names like ["Python", "SQL"] — NOT slugs
   */
  async getCareerMatches(skillNames: string[]): Promise<SkillMatchResult[]> {
    const data = await request<MatchesResponse>('/api/matches', {
      method: 'POST',
      body: { skills: skillNames },
    });
    return data.matches.map(toSkillMatchResult);
  },

  /**
   * Graph — returns a two-hop neighborhood around a named entity.
   * The entity name is matched case-insensitively by the backend.
   */
  async getGraph(entityName: string): Promise<GraphData> {
    const data = await request<GraphResponse>(
      `/api/graph?entity=${encodeURIComponent(entityName)}`
    );
    return toGraphData(data);
  },
};
