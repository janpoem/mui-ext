import { CSSProperties, useMemo } from 'react';

type a = CSSProperties;

export type JustifyContent = 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly'
export type AlignItems = 'auto' | 'start' | 'end' | 'center' | 'stretch';
export type AlignSelf = 'auto' | 'start' | 'end' | 'center' | 'stretch';

export type FlexGrowShrink = boolean | number | undefined | null;

const justifyContentShorten = {
  center : 'center',
  start  : 'flex-start',
  end    : 'flex-end',
  between: 'space-between',
  around : 'space-around',
  evenly : 'space-evenly',
};

export function useJustifyContent(value: JustifyContent | undefined | null): string | undefined {
  return useMemo(() => {
    if (value == null || !value) return undefined;
    return justifyContentShorten[value] || undefined;
  }, [value]);
}

export function useFlexGrowShrink(value: FlexGrowShrink): number | undefined {
  return useMemo(() => {
    if (value == null) return undefined;
    if (typeof value === 'boolean') return value ? 1 : 0;
    return value;
  }, [value]);
}

export function useFlexGap(value: number | string | undefined | null): number | string | undefined {
  return useMemo(() => {
    if (value == null || value === '') return undefined;
    if (typeof value === 'number') return `${value}em`;
    return value;
  }, [value]);
}
