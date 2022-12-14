import Box, { BoxProps } from '@mui/material/Box';
import React, { ComponentProps, ReactNode } from 'react';
import { MuiComponentProps, ReactComponent } from '../utils';

export type LoadingRenderProps = MuiComponentProps<{
  //
} & ComponentProps<'div'> & BoxProps>

export type LoadingRender = ReactComponent<LoadingRenderProps>;

export type LoadingConfig = {
  text: ReactNode,
  render: LoadingRender,
}

const defaultText = 'loading...';

function DefaultRender({ children, ...props }: LoadingRenderProps) {
  return <Box {...props}>{children}</Box>;
}

const config: Partial<LoadingConfig> = {};

export function setupLoading(opts: Partial<LoadingConfig>): void {
  Object.assign(config, opts);
}

export function useLoadingConfig(opts: Partial<LoadingConfig>): [ReactNode, LoadingRender] {
  return [
    opts.text || config.text || defaultText,
    opts.render || config.render || DefaultRender,
  ];
}
