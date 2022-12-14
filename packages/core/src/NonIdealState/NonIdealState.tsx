import React, { ReactNode } from 'react';
import { FlexProps } from '../Flex';
import { MuiComponentProps } from '../utils';
import { NonIdealStateRender, useNonIdealStateConfig } from './config';

export type NonIdealStateProps = MuiComponentProps<{
  title?: ReactNode,
  description?: ReactNode | ReactNode[],
  ready?: boolean,
  render?: NonIdealStateRender,
} & FlexProps>

export function NonIdealState({
  title,
  description,
  ready = false,
  render,
  children,
  ...props
}: NonIdealStateProps) {
  const [t, Render] = useNonIdealStateConfig({ title, render });
  return ready ? <>{children}</> : <Render {...props} title={t}>{description}</Render>;
}
