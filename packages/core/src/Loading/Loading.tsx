import React, { ReactNode } from 'react';
import { MuiComponentProps } from '../utils';
import { LoadingRender, useLoadingRender, useLoadingText } from './config';

export type LoadingProps = MuiComponentProps<{
  loading?: boolean,
  text?: ReactNode,
  render?: LoadingRender,
  placeholder?: ReactNode | ReactNode[],
  children?: ReactNode | ReactNode[],
}>

export function Loading({
  loading = true,
  text  : iText,
  render: iRender,
  placeholder,
  children,
  ...props
}: LoadingProps) {
  const text = useLoadingText(iText);
  const Render = useLoadingRender(iRender);

  return <>{loading ? placeholder || <Render {...props}>{text}</Render> : children}</>;
}
