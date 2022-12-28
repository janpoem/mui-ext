import React from 'react';
import { styled, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { mountOrClone } from '../utils';
import { useStackDialogConfig } from './config';
import { UseStackDialog } from './useInitStackDialog';

type BackdropProps = {
  open?: boolean,
}

const DialogBackdrop = styled('div', {
  shouldForwardProp: (propName: PropertyKey) => !['open'].includes(propName as string),
})<BackdropProps>(({ theme, open = false }) => ({
  position      : 'absolute',
  background    : theme.palette.action.disabled,
  backdropFilter: 'blur(2px)',
  display       : open ? 'flex' : 'none',
  top           : 0,
  left          : 0,
  right         : 0,
  bottom        : 0,
  zIndex        : 1000,
  justifyContent: 'center',
  alignItems    : 'center',
  color         : 'rgba(255, 255, 255, 0.95)',
  borderRadius  : theme.shape.borderRadius,
}));

export type StackDialogProps = {
  dialog: UseStackDialog,
}

export function StackDialog({ dialog }: StackDialogProps) {
  const {
    transition,
    dividers,
    minWidth,
    maxWidth,
    scroll,
    loadingProps,
    buttonProps,
    titleProps,
    contentProps: { sx: contentSx, ...contentProps },
    actionsProps,
  } = useStackDialogConfig();

  return (
    <>
      {dialog.stack.map(it => (
        <Dialog
          key={it.key}
          open={dialog.isOpen && it.key === dialog.current}
          onClose={it.backdropClose === false ? undefined : (() => dialog.close())}
          keepMounted={!!it.persistent}
          TransitionComponent={it.transition ?? transition}
          maxWidth={dialog.options.maxWidth ?? maxWidth ?? it.maxWidth}
          scroll={it.scroll ?? scroll}
        >
          <DialogBackdrop open={it.loading}>
            <CircularProgress {...loadingProps} />
          </DialogBackdrop>
          {it.title && <DialogTitle {...titleProps}>{it.title}</DialogTitle>}
          <DialogContent
            {...contentProps}
            sx={{
              ...contentSx,
              minWidth: it.minWidth ?? minWidth,
            }}
            dividers={it.dividers ?? dividers}
          >
            {typeof it.content === 'string' ? it.content : mountOrClone(it.content, { ...it.props, dialog })}
          </DialogContent>
          {it.actions?.length && (
            <DialogActions {...actionsProps}>
              {it.actions.map((act, actIdx) => (
                <Button
                  {...act}
                  {...buttonProps}
                  key={`${it.key}_act_${actIdx}`}
                  onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                    if (act.onClick) {
                      dialog.setLoading(true);
                      try {
                        await act.onClick(e, dialog);
                      } catch (err) {
                        //
                      }
                    }
                    dialog.close();
                    dialog.setLoading(false);
                  }}
                >{act.text}</Button>
              ))}
            </DialogActions>
          )}
        </Dialog>
      ))}
    </>
  );
}
