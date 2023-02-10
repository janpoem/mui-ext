import { ButtonProps, DialogProps } from '@mui/material';
import { MouseEvent, ReactNode, useCallback, useRef, useState } from 'react';
import { ComponentOrElement } from '../utils';
import { useStackDialogConfig } from './config';

// eslint-disable-next-line
type AnyProps = {};

export type OpenDialogAction = {
  text: string,
  onClick?: (e: MouseEvent<HTMLButtonElement>, dialog: UseStackDialog) => void,
} & Omit<ButtonProps, 'onClick'>

// eslint-disable-next-line
type DialogContent<P = AnyProps> = string | ComponentOrElement<P>;

export type OpenDialogArgs<P = AnyProps> = {
  key?: string,
  title?: ReactNode | null,
  content: DialogContent<P & { dialog: UseStackDialog }>,
  actions?: OpenDialogAction[],
  backdropClose?: boolean,
  // persistent?: boolean,
  minWidth?: number | string,
  dividers?: boolean,
  maxWidth?: DialogProps['maxWidth'],
  props?: P,
  onClose?: () => void,
  transition?: DialogProps['TransitionComponent'],
  scroll?: DialogProps['scroll'],
  fullScreen?: boolean,
  keepCurrent?: boolean,
};

export type OpenAlertArgs = Omit<OpenDialogArgs, 'actions'> & {
  onConfirm?: (e: MouseEvent<HTMLButtonElement>, dialog: UseStackDialog) => void,
  confirmText?: string,
};

export type OpenConfirmArgs = OpenAlertArgs & {
  onCancel?: (e: MouseEvent<HTMLButtonElement>, dialog: UseStackDialog) => void,
  cancelText?: string,
};

export type DialogItem<P = AnyProps> = OpenDialogArgs<P> & {
  key: string,
  date: Date,
  loading: boolean,
  persistent: boolean,
}

export type UseStackDialog = {
  options: InitStackDialogOptions,
  isOpen: boolean,
  shouldOpen(key: string): boolean,
  stack: DialogItem[],
  current: string | undefined,
  open<P = AnyProps>(args: OpenDialogArgs<P>): void,
  close(isDrop?: boolean | null): void,
  remove(key: string): void,
  alert(args: OpenAlertArgs): void,
  confirm(args: OpenConfirmArgs): void,
  setLoading(loading: boolean): void,
}

export type InitStackDialogOptions = {
  maxStack?: number,
  closeDelay?: number,
  maxWidth?: DialogProps['maxWidth'],
}

export function useInitStackDialog({
  maxStack = 10,
  closeDelay = 400,
  maxWidth,
}: InitStackDialogOptions): UseStackDialog {

  const idRef = useRef(0);
  const timerRef = useRef<NodeJS.Timer | undefined>(undefined);

  const config = useStackDialogConfig();

  const [stack, setStack] = useState<DialogItem[]>([]);
  const [open, setOpen] = useState<string | undefined>(undefined);
  const [current, setCurrent] = useState<string | undefined>(undefined);

  const keepDialogsRef = useRef<Record<string, string>>({});

  const clearTimer = useCallback(() => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const closeTimeout = useCallback((fn: () => void, delay: number) => {
    clearTimer();
    timerRef.current = setTimeout(fn, delay);
  }, [clearTimer]);

  const openDialog = useCallback(function <P = AnyProps>(args: OpenDialogArgs<P>) {
    clearTimer();
    let persistent = false;
    let key: string;
    if (args.key == null || args.key.trim() === '') {
      key = `dialog-${idRef.current++}`;
    } else {
      key = args.key;
      persistent = true;
    }

    // const key = args.key == null || !args.key ? `dialog-${idRef.current++}` : args.key;
    const holdCurrent = args.keepCurrent;
    const item = stack.find(it => it.key === key);
    let hasItem = item != null;
    if (item == null) {
      setStack((prevStack) => {
        return [...(prevStack.length >= maxStack ? prevStack.slice(-(maxStack - 1)) : prevStack), {
          ...args as OpenDialogArgs<AnyProps>,
          key,
          persistent,
          date   : new Date(),
          loading: false,
        }];
      });
      hasItem = true;
    }
    if (hasItem) {
      setOpen(key);
      setCurrent(prevKey => {
        if (holdCurrent && prevKey != null && prevKey !== key) {
          keepDialogsRef.current[prevKey] = key;
        }
        return key;
      });
    }
  }, [clearTimer, maxStack, stack]);

  const setLoading = useCallback((loading: boolean) => {
    if (current != null) {
      setStack(prevStack => prevStack.map(it => {
        if (it.key === current) {
          it.loading = loading;
        }
        return it;
      }));
    }
  }, [current]);

  const closeDialog = useCallback(() => {
    let canDrop = false;
    let onClose: (() => void) | undefined = undefined;
    if (open) {
      const item = stack.find(it => it.key === current);
      if (item != null) {
        canDrop = item.persistent;
        onClose = item.onClose;
      }
    }

    let recoverKey: string | undefined;
    for (const [originalKey, currentKey] of Object.entries(keepDialogsRef.current)) {
      if (currentKey === current) {
        recoverKey = originalKey;
        delete (keepDialogsRef.current[originalKey]);
        break;
      }
    }

    setOpen(recoverKey);
    recoverKey != null && setCurrent(recoverKey);

    closeTimeout(() => {
      onClose && onClose();
      canDrop && setStack((prevStack) => prevStack.filter(it => it.key !== current));
      recoverKey == null && setCurrent(recoverKey);
    }, closeDelay);
  }, [closeDelay, closeTimeout, current, open, stack]);

  const removeStack = useCallback((key: string) => {
    if (open) {
      closeDialog();
    }
    setStack((prevStack) => prevStack.filter(it => it.key !== key));
  }, [closeDialog, open]);

  const openAlert = useCallback((
    { onConfirm, confirmText, backdropClose, ...args }: OpenAlertArgs,
  ) => {
    openDialog({
      ...args,
      actions      : [
        { text: confirmText || config.confirmText, onClick: onConfirm },
      ],
      backdropClose: backdropClose == null ? false : backdropClose,
    });
  }, [config.confirmText, openDialog]);

  const openConfirm = useCallback((
    { onConfirm, confirmText, cancelText, onCancel, backdropClose, ...args }: OpenConfirmArgs,
  ) => {
    openDialog({
      ...args,
      actions      : [
        {
          text   : cancelText || config.cancelText,
          onClick: onCancel,
          color  : 'secondary',
        },
        {
          text   : confirmText || config.confirmText,
          onClick: onConfirm,
        },
      ],
      backdropClose: backdropClose == null ? false : backdropClose,
    });
  }, [config.cancelText, config.confirmText, openDialog]);

  const shouldOpen = useCallback((key: string) => {
    if (keepDialogsRef.current[key]) {
      return true;
    }
    // return current === key && open;
    return current === key && open === key;
  }, [current, open]);

  return {
    options: { maxStack, closeDelay, maxWidth },
    isOpen : open != null,
    shouldOpen,
    stack,
    current,
    open   : openDialog,
    close  : closeDialog,
    remove : removeStack,
    alert  : openAlert,
    confirm: openConfirm,
    setLoading,
  };
}
