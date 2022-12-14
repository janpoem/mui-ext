import { OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar } from 'notistack';

export type SnackbarOptions = OptionsObject

export function useSnackbarNotice(defaultOptions?: SnackbarOptions) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notice = (
    variant: OptionsObject['variant'],
    message: SnackbarMessage,
    options?: SnackbarOptions,
  ): SnackbarKey => enqueueSnackbar(message, {
    autoHideDuration: 2000,
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
    ...defaultOptions,
    ...options,
    variant,
  });

  return {
    notice : (m: SnackbarMessage, o?: SnackbarOptions) => notice('default', m, o),
    success: (m: SnackbarMessage, o?: SnackbarOptions) => notice('success', m, o),
    warning: (m: SnackbarMessage, o?: SnackbarOptions) => notice('warning', m, o),
    error  : (m: SnackbarMessage, o?: SnackbarOptions) => notice('error', m, o),
    info   : (m: SnackbarMessage, o?: SnackbarOptions) => notice('info', m, o),
    close  : (key?: SnackbarKey) => closeSnackbar(key),
  };
}
