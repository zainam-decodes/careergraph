import { SKILLS_DATA } from './dataset';
import { Skill } from '@/lib/types';

export async function fetchSkills(query?: string, category?: string): Promise<Skill[]> {
  let results = [...SKILLS_DATA];
  if (category && category !== 'All') {
    results = results.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.category.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );
  }
  return results;
}

export async function fetchSkillById(id: string): Promise<Skill | null> {
  const skill = SKILLS_DATA.find(s => s.id.toLowerCase() === id.toLowerCase() || s.name.toLowerCase() === id.toLowerCase());
  return skill || null;
}
