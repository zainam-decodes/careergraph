export type EntityType = 'Skill' | 'Role' | 'Company' | 'Project';

export type RelationType = 
  | 'REQUIRES'     // Role -> Skill
  | 'OFFERS'       // Company -> Role
  | 'RELATED_TO'   // Skill -> Skill
  | 'USES'         // Project -> Skill
  | 'HAS_SKILL';    // User -> Skill

export interface GraphNode {
  id: string;
  label: string;
  type: EntityType;
  category?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: RelationType;
  label?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  rolesCount: number;
  relatedSkillsCount: number;
  projectsCount: number;
  companiesCount: number;
}

export interface Role {
  id: string;
  title: string;
  department: string;
  description: string;
  requiredSkills: string[];
  companies: string[];
  averageMatchScore?: number;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  openRoles: string[];
  techStack: string[];
  location: string;
}

export interface Project {
  id: string;
  title: string;
  domain: string;
  description: string;
  skillsUsed: string[];
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface SkillMatchResult {
  roleId: string;
  roleTitle: string;
  department: string;
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  connectedCompanies: string[];
  careerPathHop: string[];
}

export interface TraversalPath {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
