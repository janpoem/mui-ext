import { useMemo } from 'react';

export type RatioValue = `${number}/${number}` | number | undefined | null;

export function useRatio(value: RatioValue): number {
  return useMemo(() => {
    if (value == null) return 1;
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && /[\d+][\\/][\d+]/.test(value)) {
      try {
        return eval(value);
      } catch (e) {
        return 1;
      }
    }
    return 1;
  }, [value]);
}

export function useRatioStyle(value: RatioValue): string {
  const ratio = useRatio(value);
  return `${1 / ratio * 100}%`;
}
