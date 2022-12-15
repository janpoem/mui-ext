import { useMemo } from 'react';
import { filterNumeric } from '../utils';

export type RatioValue = `${number}/${number}` | number | undefined | null;

export function useRatio(value: RatioValue): number {
  return useMemo(() => {
    if (value == null) return 1;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const match = value.trim().match(/^(\d+)[\\/](\d+)$/);
      if (match && match[1] && match[2]) {
        try {
          const [v1, v2] = [
            filterNumeric(match[1]),
            filterNumeric(match[2]),
          ]
          if (v1 <= 0 || v2 <= 0) return 1;
          return v1 / v2;
        } catch (e) {
          return 1;
        }
      }
      // try {
      //   const [v1, v2] = value.trim().split('/');
      //   return filterNumeric(v1) / filterNumeric(v2);
      // } catch (e) {
      //   return 1;
      // }
    }
    return 1;
  }, [value]);
}

export function useRatioStyle(value: RatioValue): string {
  const ratio = useRatio(value);
  return `${1 / ratio * 100}%`;
}
