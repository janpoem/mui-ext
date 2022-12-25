import { TextFieldProps } from '@mui/material';
import { useHookForm } from '../HookForm';

export type MuiInputSharedProps = {
  size?: TextFieldProps['size'],
  variant?: TextFieldProps['variant'],
  sx?: TextFieldProps['sx'],
}

export function useMuiInputSharedProps(): MuiInputSharedProps {
  const { config } = useHookForm();
  return config.inputProps;
}


