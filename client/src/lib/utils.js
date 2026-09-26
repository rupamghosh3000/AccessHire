import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatSalary(salaryObj) {
  if (!salaryObj || (!salaryObj.min && !salaryObj.max)) {
    return 'Competitive Salary';
  }
  const curr = salaryObj.currency === 'INR' ? '₹' : '$';
  if (salaryObj.min && salaryObj.max) {
    return `${curr}${(salaryObj.min / 100000).toFixed(1)}L - ${curr}${(salaryObj.max / 100000).toFixed(1)}L / year`;
  }
  if (salaryObj.min) return `From ${curr}${(salaryObj.min / 100000).toFixed(1)}L`;
  return `Up to ${curr}${(salaryObj.max / 100000).toFixed(1)}L`;
}
