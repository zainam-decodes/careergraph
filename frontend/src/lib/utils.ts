import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEntityTypeName(type: string): string {
  switch (type) {
    case 'Skill': return 'Skill';
    case 'Role': return 'Role';
    case 'Company': return 'Company';
    case 'Project': return 'Project';
    default: return type;
  }
}
