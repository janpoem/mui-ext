import { default as clsx } from 'clsx';
import { useMemo } from 'react';

export type ClassNameType = string | null | undefined;

export function useClsx(...cls: ClassNameType[]): string {
  return useMemo(() => {
    return clsx(...cls);
  }, cls); // eslint-disable-line react-hooks/exhaustive-deps
}
