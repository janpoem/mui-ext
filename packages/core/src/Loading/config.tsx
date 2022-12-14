import { Box, BoxProps } from '@mui/material';
import React, { ComponentProps, ReactNode } from 'react';
import { MuiComponentProps, ReactComponent } from '../utils';

export type LoadingRenderProps = MuiComponentProps<{
  //
} & ComponentProps<'div'> & BoxProps>

export type LoadingRender = ReactComponent<LoadingRenderProps>;

export type LoadingConfig = {
  text?: ReactNode,
  render?: LoadingRender,
}

const defaultText = 'loading...';

function DefaultRender({ children, ...props }: LoadingRenderProps) {
  return <Box {...props}>{children}</Box>
}

const config: LoadingConfig = {};

export function setupLoading(data: Partial<LoadingConfig>): void {
  Object.assign(config, data);
}

export function useLoadingRender(render?: LoadingRender): LoadingRender {
  return render || config.render || DefaultRender;
}

export function useLoadingText(text?: ReactNode): ReactNode {
  return text || config.text || defaultText;
}
