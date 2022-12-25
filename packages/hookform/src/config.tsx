import { ComponentOrElement, HtmlComponentProps, mountOrClone, MuiComponentProps, ReactComponent } from '@mui-ext/core';
import { Box, BoxProps, styled, Backdrop as MuiBackdrop, CircularProgress } from '@mui/material';
import React, { ComponentProps, ReactNode, useMemo } from 'react';
import { Field, FieldError } from 'react-hook-form';
import { useHookForm } from './HookForm';
import { MuiInputSharedProps } from './Input';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormLoadingProps<P = any> = HtmlComponentProps<{ loading?: boolean } & P>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormLoading<P = any> = ComponentOrElement<FormLoadingProps<P>>

export type FormRenderProps = MuiComponentProps<{
  //
} & ComponentProps<'div'> & BoxProps>

export type FormRender = ReactComponent<FormRenderProps>;

const Form = styled(Box)(() => ({
  position: 'relative',
}));

const Backdrop = styled(MuiBackdrop)(({ theme }) => ({
  position  : 'absolute',
  userSelect: 'none',
  color     : theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0,0,0, 0.7)',
  //
  '& .MuiCircularProgress-root': {
    color: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0,0,0, 0.7)',
  },
}));

function DefaultFormRender({ children, ...props }: FormRenderProps) {
  const { config: { loadingRender }, loading } = useHookForm();
  return (
    <Form {...props}>
      <Backdrop open={loading}>{mountOrClone(loadingRender, { loading })}</Backdrop>
      {children}
    </Form>
  );
}

export type HookFormConfig = {
  ns: string,
  lng?: string,
  hookErrors: HookErrors,
  render: FormRender,
  loadingRender: FormLoading,
  submitText: ReactNode | ReactNode[],
  cancelText: ReactNode | ReactNode[],
  resetText: ReactNode | ReactNode[],
  inputProps: MuiInputSharedProps,
}

const config: Partial<HookFormConfig> = {};

export function setupHookForm(options: Partial<HookFormConfig>) {
  Object.assign(config, options);
}

export function useHookFormConfig(options: Partial<HookFormConfig>): HookFormConfig {
  return {
    ns           : options.ns || config.ns || 'form',
    lng          : options.lng || config.lng || undefined,
    hookErrors   : useHookFormErrors(options.hookErrors),
    render       : options.render || config.render || DefaultFormRender,
    loadingRender: options.loadingRender || config.loadingRender || (() => <CircularProgress/>),
    submitText   : options.submitText || config.submitText || 'Submit',
    cancelText   : options.cancelText || config.cancelText || 'Cancel',
    resetText    : options.resetText || config.resetText || 'Reset',
    inputProps   : config.inputProps || {
      size   : 'small',
      variant: 'outlined',
    },
  };
}

export type HookFormRuleMessage = string | ((err: FieldError, field: Field | undefined) => string);

export type HookErrors = {
  required: HookFormRuleMessage,
  min: HookFormRuleMessage,
  max: HookFormRuleMessage,
  minLength: HookFormRuleMessage,
  maxLength: HookFormRuleMessage,
  pattern: HookFormRuleMessage,
  validate: HookFormRuleMessage,
  [k: string]: HookFormRuleMessage,
}

function defaultHookErrors(): HookErrors {
  return {
    required : 'this field is required',
    min      : (_, field) => field?._f.min != null ? `must be greater than or equal to ${field?._f.min}` : `must be greater than or equal to the minimum`,
    max      : (_, field) => field?._f.max != null ? `must be less than or equal to ${field?._f.max}` : `must be less than or equal to the maximum`,
    minLength: (_, field) => field?._f.minLength != null ? `must be at least ${field?._f.minLength} characters` : `must be at least the minLength`,
    maxLength: (_, field) => field?._f.maxLength != null ? `must be at most ${field?._f.maxLength} characters` : `must be at most the maxLength`,
    pattern  : 'not match the pattern',
    validate : 'validation error',
  };
}

export function useHookFormErrors(errors?: Partial<HookErrors>): HookErrors {
  return useMemo(() => {
    if (config.hookErrors != null) {
      if (errors != null) {
        return Object.assign(defaultHookErrors(), config.hookErrors, errors);
      }
      return Object.assign(defaultHookErrors(), config.hookErrors);
    }
    return defaultHookErrors();
  }, [errors]);
}

