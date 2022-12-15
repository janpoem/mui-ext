import { useMemo } from 'react';

// export const useAutoId = typeof useId === 'function' ? useId : useAutoIdCompatible;

const ids: Record<string, number> = {};

export function useAutoId(prefix?: string): string {
  return useMemo(() => {
    const key = prefix == null || !prefix ? 'el' : prefix;
    if (ids[key] == null) {
      ids[key] = 1;
    }
    return `${key}_${ids[key]++}`;
  }, [prefix]);
}
