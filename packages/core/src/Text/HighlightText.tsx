import { styled } from '@mui/material/styles';
import React, { ElementType, ReactNode, useMemo } from 'react';
import { MuiComponentProps, pregQuote } from '../utils';

type HighlightProps = {
  color?: string,
}

const Highlight = styled('span', {
  shouldForwardProp: (prop: PropertyKey) => !['color'].includes(prop as string)
})<HighlightProps>(({ theme, color }) => ({
  color: color || theme.palette.error.main,
}));

// eslint-disable-next-line @typescript-eslint/ban-types
type ElementTypeProps<E> = E extends ElementType<infer P> ? P : {};

export type HighlightTextProps<E extends ElementType = 'span', P = ElementTypeProps<E>> = MuiComponentProps<{
  text?: string,
  children?: string,
  search?: string,
  tag?: E
  prefix?: ReactNode | ReactNode[],
  suffix?: ReactNode | ReactNode[],
  color?: string,
} & P>;

export function HighlightText<E extends ElementType = 'span', P = ElementTypeProps<E>>({
  text,
  children,
  search,
  tag,
  prefix,
  suffix,
  color,
  ...props
}: HighlightTextProps<E, P>) {
  const original = useMemo(() => text || children, [text, children]);
  // @ts-ignore tag
  const Render = useMemo(() => styled(tag ?? 'span')({}), [tag]);

  const items = useMemo(() => {
    if (!original) return [];
    if (!search) return [original];
    const length = `${search}`.length;
    const result: (ReactNode | string)[] = [];
    const pattern = new RegExp(pregQuote(search), 'ig');
    const segments = original.split(pattern);
    let index = 0;
    segments.forEach((segment, i) => {
      result.push(segment);
      index += segment.length;
      if (i < segments.length - 1) {
        result.push((
          <Highlight key={`hl_${i}`} color={color} className={'highlight-text'}>
            {original.substr(index, length)}
          </Highlight>
        ));
        index += length;
      }
    })
    return result;
  }, [original, search, color])

  return (
    <Render {...props}>
      {prefix}
      {items}
      {suffix}
    </Render>
  );
}
