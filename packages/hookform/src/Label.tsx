import { styled } from '@mui/material';
import React, { ReactNode } from 'react';
import { FieldRules } from './FormField';

export type LabelProps = {
  name: string,
  children?: ReactNode,
  rules?: FieldRules,
}

export function Label({ children, rules }: LabelProps) {
  const { required } = rules || {};

  if (!children) {
    return null;
  }

  return (
    <>
      {children}
      {required ? <Required/> : null}
    </>
  );
}

const Required = styled('span')(({ theme }) => ({
  color    : theme.palette.error.main,
  ':before': {
    content   : '"*"',
    marginLeft: '0.25rem',
  },
}));
