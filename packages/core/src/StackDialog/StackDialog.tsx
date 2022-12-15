import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
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
  const { transition, dividers, minWidth, scroll, loadingProps } = useStackDialogConfig();

  return (
    <>
      {dialog.stack.map(it => (
        <Dialog
          key={it.key}
          open={dialog.isOpen && it.key === dialog.current}
          onClose={it.backdropClose === false ? undefined : (() => dialog.close())}
          keepMounted={!!it.persistent}
          TransitionComponent={it.transition ?? transition}
          maxWidth={dialog.options.maxWidth ?? it.maxWidth}
          scroll={it.scroll ?? scroll}
        >
          <DialogBackdrop open={it.loading}>
            <CircularProgress {...loadingProps} />
          </DialogBackdrop>
          {it.title && <DialogTitle>{it.title}</DialogTitle>}
          <DialogContent
            sx={{
              // p       : `${it.title ? (it.dividers ?? dividers ? '0.5rem' : '0') : '1rem'} 1rem 1rem`,
              minWidth: it.minWidth ?? minWidth,
            }}
            dividers={it.dividers ?? dividers}
          >
            {typeof it.content === 'string' ? it.content : mountOrClone(it.content, { ...it.props, dialog })}
          </DialogContent>
          {it.actions?.length && (
            <DialogActions>
              {it.actions.map((act, actIdx) => (
                <Button
                  {...act}
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
