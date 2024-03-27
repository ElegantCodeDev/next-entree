import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const differenceInSeconds = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000
  );

  const timeUnits = [
    { unit: 'year', seconds: 31556952 },
    { unit: 'month', seconds: 2629746 },
    { unit: 'week', seconds: 604800 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 }
  ];

  for (const { unit, seconds } of timeUnits) {
    const count = Math.floor(differenceInSeconds / seconds);
    if (count >= 1) {
      return `${count} ${count === 1 ? unit : unit + 's'} ago`;
    }
  }

  return 'just now';
};

export const formatAndDivideNumber = (number: number): string => {
  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1)}M`;
  } else if (number >= 1_000) {
    return `${(number / 1_000).toFixed(1)}k`;
  } else {
    return number.toString();
  }
};
