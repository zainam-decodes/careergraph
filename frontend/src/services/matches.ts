import { ROLES_DATA, SKILLS_DATA, COMPANIES_DATA } from './dataset';
import { SkillMatchResult } from '@/lib/types';

export async function calculateMatches(selectedSkillIds: string[]): Promise<SkillMatchResult[]> {
  if (!selectedSkillIds || selectedSkillIds.length === 0) {
    return [];
  }

  // Normalize user selected skills
  const normalizedUserSkills = new Set(
    selectedSkillIds.map(s => s.toLowerCase().trim())
  );

  const results: SkillMatchResult[] = ROLES_DATA.map(role => {
    const required = role.requiredSkills.map(s => s.toLowerCase());
    
    const matched = required.filter(skill => normalizedUserSkills.has(skill));
    const missing = required.filter(skill => !normalizedUserSkills.has(skill));
    
    const matchPercentage = Math.round((matched.length / required.length) * 100);

    // Map skill IDs back to nice human display names
    const getSkillName = (id: string) => {
      const found = SKILLS_DATA.find(s => s.id === id);
      return found ? found.name : id;
    };

    // Connected company names
    const connectedCompanies = COMPANIES_DATA
      .filter(c => role.companies.includes(c.id))
      .map(c => c.name);

    // Multi-hop path example: User Skill -> Missing Skill -> Role -> Company
    const sampleSkillName = matched.length > 0 ? getSkillName(matched[0]) : 'User Skill';
    const sampleCompany = connectedCompanies.length > 0 ? connectedCompanies[0] : 'Enterprise';
    
    const careerPathHop = [
      sampleSkillName,
      role.title,
      sampleCompany
    ];

    return {
      roleId: role.id,
      roleTitle: role.title,
      department: role.department,
      matchPercentage,
      matchedSkills: matched.map(getSkillName),
      missingSkills: missing.map(getSkillName),
      connectedCompanies,
      careerPathHop
    };
  });

  // Sort descending by match percentage
  return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
