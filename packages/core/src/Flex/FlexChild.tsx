import React, { ComponentProps } from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import { Property } from 'csstype';
import { HtmlComponentProps } from '../utils';
import { FlexGrowShrink, useFlexGrowShrink } from './hooks';

export type FlexChildProps = {
  grow?: FlexGrowShrink,
  shrink?: FlexGrowShrink,
  basis?: Property.FlexBasis | number,
} & ComponentProps<'div'>

export const FlexChild: StyledComponent<HtmlComponentProps<FlexChildProps>> = styled('div', {
  shouldForwardProp: (props) => !['grow', 'shrink', 'basis'].includes(props),
})(({
  grow,
  shrink,
  basis,
}) => ({
  flexGrow  : useFlexGrowShrink(grow),
  flexShrink: useFlexGrowShrink(shrink),
  flexBasis : basis == null ? undefined : basis,
}));
