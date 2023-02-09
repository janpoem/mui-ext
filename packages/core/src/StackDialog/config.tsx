import {
  CircularProgressProps,
  DialogProps,
  ButtonProps,
  DialogTitleProps,
  DialogContentProps, DialogActionsProps,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

export type StackDialogButtonProps = {
  size?: ButtonProps['size'],
  variant?: ButtonProps['variant'],
  sx?: ButtonProps['sx'],
}

export type StackDialogConfig = {
  confirmText: string,
  cancelText: string,
  transition: DialogProps['TransitionComponent'],
  dividers: boolean,
  maxWidth: DialogProps['maxWidth'] | undefined,
  minWidth: number,
  scroll: DialogProps['scroll'],
  loadingProps: CircularProgressProps,
  buttonProps: StackDialogButtonProps,
  titleProps: DialogTitleProps,
  contentProps: DialogContentProps,
  actionsProps: DialogActionsProps,
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
    maxWidth    : config.maxWidth ?? undefined,
    minWidth    : config.minWidth ?? 320,
    scroll      : config.scroll ?? 'paper',
    loadingProps: config.loadingProps ?? {},
    buttonProps : config.buttonProps ?? { size: 'small' },
    titleProps  : config.titleProps ?? {},
    contentProps: config.contentProps ?? {},
    actionsProps: config.actionsProps ?? {},
  };
}

const DefaultTransition = React.forwardRef(function Transition(
  { children, ...props }: TransitionProps & {
    // eslint-disable-next-line
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props}>{children}</Slide>;
});
