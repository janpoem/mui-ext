import React, { ReactNode } from 'react';
import { MuiComponentProps } from '../utils';
import { LoadingRender, useLoadingConfig } from './config';

export type LoadingProps = MuiComponentProps<{
  loading?: boolean,
  text?: ReactNode,
  render?: LoadingRender,
  placeholder?: ReactNode | ReactNode[],
  children?: ReactNode | ReactNode[],
}>

export function Loading({
  loading = true,
  text,
  render,
  placeholder,
  children,
  ...props
}: LoadingProps) {
  const [loadingText, Render] = useLoadingConfig({ text, render });
  return <>{loading ? placeholder || <Render {...props}>{loadingText}</Render> : children}</>;
}
