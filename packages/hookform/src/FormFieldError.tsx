import { FormHelperText, FormHelperTextProps } from '@mui/material';
import React, { ReactNode, useMemo } from 'react';
import { FieldError, get } from 'react-hook-form';
import { useHookForm } from './useHookForm';

export type MuiFormHelperProps = {
  margin?: FormHelperTextProps['margin'],
  variant?: FormHelperTextProps['variant'],
  sx?: FormHelperTextProps['sx']
}

export type FieldErrorProps = {
  field: string,
  tip?: ReactNode | ReactNode[],
  sx?: FormHelperTextProps['sx'],
}

const isFieldError = (err: unknown): err is FieldError => err != null && typeof err === 'object' && !!(err as Record<string, unknown>).type;

export function FormFieldError({ field: fieldName, tip, sx }: FieldErrorProps) {
  const {
    config: { hookErrors, formHelperProps },
    control,
    formState: { errors },
  } = useHookForm();
  const { sx: _sx, ...props } = formHelperProps;
  const field = useMemo(() => get(control._fields, fieldName), [fieldName, control._fields]);
  const error = errors[fieldName];

  const [message, isError] = useMemo(() => {
    if (isFieldError(error)) {
      if (error.message) return [error.message, true];
      if (hookErrors[error.type] != null) {
        const obj = hookErrors[error.type];
        return [typeof obj === 'function' ? obj(error, field) : obj, true];
      }
    }
    return [tip, undefined];
  }, [hookErrors, field, error, tip]);

  const __sx = { ..._sx, ...sx };

  if (!message) return null;

  return (
    <FormHelperText
      {...props}
      sx={__sx}
      error={isError}
    >
      {message}
    </FormHelperText>
  );
}
