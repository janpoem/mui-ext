import { FormHelperText } from '@mui/material';
import React, { ReactNode, useMemo } from 'react';
import { FieldError, get } from 'react-hook-form';
import { useHookForm } from './HookForm';

export type FieldErrorProps = {
  field: string,
  tip?: ReactNode | ReactNode[],
}

const isFieldError = (err: unknown): err is FieldError => err != null && typeof err === 'object' && !!(err as Record<string, unknown>).type;

export function FormFieldError({ field: fieldName, tip }: FieldErrorProps) {
  const { config: { hookErrors }, control, formState: { errors } } = useHookForm();
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

  if (!message) return null;

  return (
    <FormHelperText error={isError}>{message}</FormHelperText>
  );
}
