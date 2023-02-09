import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Flex, FlexProps } from '../Flex';
import { MuiComponentProps, ReactComponent } from '../utils';

export type NonIdealStateRenderProps = MuiComponentProps<{
  title?: ReactNode,
  children?: ReactNode | ReactNode[],
} & Omit<FlexProps, 'title'>>

export type NonIdealStateRender = ReactComponent<NonIdealStateRenderProps>;

export type NonIdealStateConfig = {
  title: ReactNode,
  render: NonIdealStateRender,
}

const defaultTitle = 'Non Ideal';

function DefaultRender({
  title,
  children,
  col = true,
  justify = 'center',
  items = 'center',
  gap = 1,
  ...props
}: NonIdealStateRenderProps) {
  return (
    <Wrap {...props} {...{ col, justify, items, gap }}>
      <Title className="title">{title}</Title>
      {children ? <Description className="description">{children}</Description> : null}
    </Wrap>
  );
}

const config: Partial<NonIdealStateConfig> = {};

const Wrap = styled(Flex)(({ theme }) => ({
  margin: '1em auto',
  color : theme.palette.action.disabled,
}));

const Title = styled('div')(() => ({
  fontSize: '1.2em',
}));

const Description = styled('div')(() => ({
  //
}));

export function setupNonIdealState(opts: Partial<NonIdealStateConfig>): void {
  Object.assign(config, opts);
}

export function useNonIdealStateConfig(opts: Partial<NonIdealStateConfig>): [ReactNode, NonIdealStateRender] {
  return [
    opts.title || config.title || defaultTitle,
    opts.render || config.render || DefaultRender,
  ];
}
