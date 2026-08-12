import { ROLES_DATA } from './dataset';
import { Role } from '@/lib/types';

export async function fetchRoles(query?: string): Promise<Role[]> {
  let results = [...ROLES_DATA];
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(r => 
      r.title.toLowerCase().includes(q) || 
      r.department.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    );
  }
  return results;
}

export async function fetchRoleById(id: string): Promise<Role | null> {
  const role = ROLES_DATA.find(r => r.id.toLowerCase() === id.toLowerCase() || r.title.toLowerCase().replace(/\s+/g, '-').toLowerCase() === id.toLowerCase());
  return role || null;
}
