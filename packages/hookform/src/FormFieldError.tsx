import { ComponentOrElement, mountOrClone } from '@mui-ext/core';
import { FormHelperText, FormHelperTextProps } from '@mui/material';
import React, { ReactNode, useMemo } from 'react';
import { FieldError, get } from 'react-hook-form';
import { HookErrors } from './types';
import { useHookForm } from './useHookForm';
import { isFieldError } from './utils';

export type MuiFormHelperProps = {
  margin?: FormHelperTextProps['margin'],
  variant?: FormHelperTextProps['variant'],
  sx?: FormHelperTextProps['sx']
}

export type FormFieldErrorRenderProps = {
  children?: ReactNode | ReactNode[],
  field: string,
  error?: FieldError,
  message?: ReactNode | ReactNode[],
}

export type FieldErrorProps = {
  field: string,
  tip?: ReactNode | ReactNode[],
  sx?: FormHelperTextProps['sx'],
  hookErrors?: Partial<HookErrors>,
  render?: ComponentOrElement<FormFieldErrorRenderProps>,
}

export function FormFieldError({
  field: fieldName,
  tip,
  sx,
  hookErrors: fieldHookErrors,
  render,
}: FieldErrorProps) {
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
      const mixErrors = { ...hookErrors, ...fieldHookErrors };
      if (mixErrors[error.type] != null) {
        const obj = mixErrors[error.type];
        return [typeof obj === 'function' ? obj(error, field) : obj, true];
      }
    }
    return [tip, undefined];
  }, [hookErrors, fieldHookErrors, field, error, tip]);

  const __sx = { ..._sx, ...sx };

  if (!message && render == null) return null;

  const children = (
    <FormHelperText {...props} sx={__sx} error={isError}>{message}</FormHelperText>
  );

  return render != null ? mountOrClone(render, {
    field  : fieldName,
    error  : isError ? error as FieldError : undefined,
    message: message,
    children,
  }) : children;
}
