import { StyledComponent } from '@emotion/styled';
import { styled } from '@mui/material';
import { Property } from 'csstype';
import { HtmlComponentProps } from '../utils';
import { useRatioStyle } from './hooks';

export type AspectOuterProps = {
  ratio?: number,
  bg?: string,
  bgColor?: Property.BackgroundColor,
  bgPosition?: string,
  bgSize?: Property.BackgroundSize,
  bgRepeat?: Property.BackgroundRepeat
}

export const AspectOuter: StyledComponent<HtmlComponentProps<AspectOuterProps>> = styled('div', {
  shouldForwardProp: (prop) => !['ratio', 'bg', 'bgColor', 'bgPosition', 'bgSize', 'bgRepeat'].includes(prop as string),
})<AspectOuterProps>(({
  ratio,
  bg,
  bgColor = 'transparent',
  bgPosition = 'center center',
  bgSize = 'contain',
  bgRepeat = 'no-repeat',
}) => ({
  position          : 'relative',
  paddingTop        : useRatioStyle(ratio),
  width             : '100%',
  backgroundColor   : bgColor,
  backgroundImage   : bg ? `url(${bg})` : undefined,
  backgroundPosition: bgPosition,
  backgroundSize    : bgSize,
  backgroundRepeat  : bgRepeat,
}));

export type AspectInnerProps = {
  //
}

export const AspectInner: StyledComponent<HtmlComponentProps<AspectInnerProps>> = styled('div')<AspectInnerProps>(() => ({
  position: 'absolute',
  top     : 0,
  left    : 0,
  right   : 0,
  bottom  : 0,
  display : 'flex',
}));
