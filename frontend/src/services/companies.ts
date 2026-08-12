import { COMPANIES_DATA } from './dataset';
import { Company } from '@/lib/types';

export async function fetchCompanies(query?: string): Promise<Company[]> {
  let results = [...COMPANIES_DATA];
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.industry.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }
  return results;
}

export async function fetchCompanyById(id: string): Promise<Company | null> {
  const company = COMPANIES_DATA.find(c => c.id.toLowerCase() === id.toLowerCase() || c.name.toLowerCase() === id.toLowerCase());
  return company || null;
}
