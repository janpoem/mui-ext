import { Slide, CircularProgressProps, DialogProps } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

export type StackDialogConfig = {
  confirmText: string,
  cancelText: string,
  transition: DialogProps['TransitionComponent'],
  dividers: boolean,
  minWidth: number,
  scroll: DialogProps['scroll'],
  loadingProps: CircularProgressProps,
}

const config: Partial<StackDialogConfig> = {};

export function setupStackDialog(opts: Partial<StackDialogConfig>) {
  Object.assign(config, opts);
}

export function useStackDialogConfig(): StackDialogConfig {
  return {
    confirmText : config.confirmText ?? 'Confirm',
    cancelText  : config.cancelText ?? 'Cancel',
    transition  : config.transition ?? DefaultTransition,
    dividers    : config.dividers ?? false,
    minWidth    : config.minWidth ?? 320,
    scroll      : config.scroll ?? 'paper',
    loadingProps: config.loadingProps ?? {},
  };
}

const DefaultTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
