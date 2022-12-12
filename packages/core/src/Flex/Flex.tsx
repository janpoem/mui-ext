import styled, { StyledComponent } from '@emotion/styled';
import { ReactNode } from 'react';
import { HtmlComponentProps } from '../utils';
import { FlexChild, FlexChildProps } from './FlexChild';
import { AlignItems, useFlexGap, useJustifyContent, JustifyContent } from './hooks';

export type FlexProps = {
  inline?: boolean,
  col?: boolean,
  rev?: boolean,
  justify?: JustifyContent | undefined | null,
  items?: AlignItems,
  gap?: number | string | null,
  children?: ReactNode | ReactNode[],
  hide?: boolean,
  wrap?: boolean,
} & FlexChildProps;

export const Flex: StyledComponent<HtmlComponentProps<FlexProps>> = styled(FlexChild, {
  shouldForwardProp: (props) => !['inline', 'col', 'rev', 'justify', 'items', 'gap', 'hide', 'wrap'].includes(props),
})(({
  inline,
  col,
  rev,
  justify,
  items,
  gap,
  hide,
  wrap,
}) => ({
  display       : hide === true ? 'none' : (inline ? 'inline-flex' : 'flex'),
  flexDirection : col ? `column${rev ? '-reverse' : ''}` : `row${rev ? '-reverse' : ''}`,
  gap           : useFlexGap(gap),
  justifyContent: useJustifyContent(justify),
  alignItems    : items,
  flexWrap      : wrap ? 'wrap' : undefined,
}));

