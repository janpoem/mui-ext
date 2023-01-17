import { ComponentProps } from 'react';
import { styled } from '@mui/material';
import { StyledComponent } from '@mui/styles';
import { Property } from 'csstype';
import { MuiComponentProps } from '../utils';
import { FlexGrowShrink, useFlexGrowShrink } from './hooks';

export type FlexChildProps = {
  grow?: FlexGrowShrink,
  shrink?: FlexGrowShrink,
  basis?: Property.FlexBasis | number,
  flex?: Property.Flex,
} & ComponentProps<'div'>

export const FlexChild: StyledComponent<MuiComponentProps<FlexChildProps>> = styled('div', {
  shouldForwardProp: (props) => !['grow', 'shrink', 'basis', 'sx'].includes(props as string),
})<FlexChildProps>(({
  grow,
  shrink,
  basis,
  flex,
}) => ({
  flex,
  flexGrow  : useFlexGrowShrink(grow),
  flexShrink: useFlexGrowShrink(shrink),
  flexBasis : basis == null ? undefined : basis,
}));
