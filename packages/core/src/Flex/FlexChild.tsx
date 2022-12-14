import { ComponentProps } from 'react';
import { StyledComponent } from '@emotion/styled';
import { styled } from '@mui/material';
import { Property } from 'csstype';
import { HtmlComponentProps } from '../utils';
import { FlexGrowShrink, useFlexGrowShrink } from './hooks';

export type FlexChildProps = {
  grow?: FlexGrowShrink,
  shrink?: FlexGrowShrink,
  basis?: Property.FlexBasis | number,
} & ComponentProps<'div'>

export const FlexChild: StyledComponent<HtmlComponentProps<FlexChildProps>> = styled('div', {
  shouldForwardProp: (props) => !['grow', 'shrink', 'basis', 'sx'].includes(props as string),
})<FlexChildProps>(({
  grow,
  shrink,
  basis,
}) => ({
  flexGrow  : useFlexGrowShrink(grow),
  flexShrink: useFlexGrowShrink(shrink),
  flexBasis : basis == null ? undefined : basis,
}));
