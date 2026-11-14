import { MAX_RATING } from '../const';

export function getRatingWidthStyle(rating: number): string {
  return `${Math.round(rating) * (100 / MAX_RATING)}%`;
}
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}
