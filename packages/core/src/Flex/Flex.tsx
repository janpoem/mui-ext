import { styled } from '@mui/material/styles';
import { StyledComponent } from '@mui/styles';
import { ReactNode } from 'react';
import { MuiComponentProps } from '../utils';
import { FlexChild, FlexChildProps } from './FlexChild';
import { AlignItems, useFlexGap, useJustifyContent, JustifyContent } from './hooks';

export type FlexProps = {
  inline?: boolean,
  col?: boolean,
  rev?: boolean,
  justify?: JustifyContent,
  items?: AlignItems,
  gap?: number | string | null,
  children?: ReactNode | ReactNode[],
  hide?: boolean,
  wrap?: boolean,
} & FlexChildProps;

export const Flex: StyledComponent<MuiComponentProps<FlexProps>> = styled(FlexChild, {
  shouldForwardProp: (props) => !['inline', 'col', 'rev', 'justify', 'items', 'gap', 'hide', 'wrap', 'sx'].includes(props as string),
})<FlexProps>(({
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
