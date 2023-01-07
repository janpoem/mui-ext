import { TextFieldProps } from '@mui/material';
import { useHookForm } from '../useHookForm';

export type MuiInputSharedProps = {
  size?: TextFieldProps['size'],
  variant?: TextFieldProps['variant'],
  sx?: TextFieldProps['sx'],
}

export function useMuiInputSharedProps(): MuiInputSharedProps {
  const { config } = useHookForm();
  return config.inputProps;
}


