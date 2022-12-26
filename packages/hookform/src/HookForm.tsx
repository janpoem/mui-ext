import { useAutoId } from '@mui-ext/core';
import { SxProps, Theme } from '@mui/material';
import React, {
  BaseSyntheticEvent,
  ComponentType,
  createElement, CSSProperties, Dispatch,
  ForwardedRef,
  forwardRef,
  ReactNode, SetStateAction,
  useCallback, useEffect, useMemo,
  useRef,
  useState,
} from 'react';
import {
  FormProvider,
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
  useFormContext,
  SubmitHandler, SubmitErrorHandler, FieldErrors,
} from 'react-hook-form';
import { FormLoading, HookFormConfig, useHookFormConfig } from './config';
import { MuiFormHelperProps } from './FormFieldError';
import { MuiInputSharedProps } from './Input';
import { validateReturn } from './utils';

export type HookFormCustomError = Error | string | undefined;

export type HookFormCustomErrors<T extends FieldValues = FieldValues> = Partial<Record<keyof T | string, HookFormCustomError>>;

export type HookFormContext<T extends FieldValues = FieldValues> = {
  autoId: string,
  config: HookFormConfig,
  customErrors: HookFormCustomErrors<T>,
  setCustomError: (field: keyof T | string, err: HookFormCustomError | null) => void,
  setCustomErrors: (errs: HookFormCustomErrors<T>) => void,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  gap: number | string,
  generalErrorKey: string,
  // 这里的 formSubmit 预留一层包装
  formSubmit: () => (e: BaseSyntheticEvent) => Promise<void>,
  validateReturn: typeof validateReturn
  setGeneralError: (message: string | undefined) => void,
} & UseFormReturn<T>;

type SubmitResult = void | boolean

export type HookFormProps<T extends FieldValues = FieldValues> = {
  ns?: string,
  lng?: string,
  sx?: SxProps<Theme>,
  style?: CSSProperties | undefined,
  className?: string | undefined,
  children?: ReactNode | ReactNode[] | ComponentType<HookFormContext<T>>,
  loading?: boolean,
  loadingRender?: FormLoading,
  gap?: number | string,
  generalErrorKey?: string,
  onSubmit?: (data: T, form: HookFormContext<T>) => SubmitResult | Promise<SubmitResult>,
  onInvalid?: (errors: FieldErrors<T>, form: HookFormContext<T>) => void,
  //
  inputProps?: MuiInputSharedProps,
  formHelperProps?: MuiFormHelperProps,
} & UseFormProps<T>

function HookFormGeneric<T extends FieldValues = FieldValues>({
  ns,
  lng,
  children,
  loading: outerLoading = false,
  loadingRender,
  gap = 1,
  generalErrorKey = '',
  onSubmit,
  onInvalid,
  inputProps,
  formHelperProps,
  // hook-form props
  mode = 'all',
  reValidateMode = 'onChange',
  defaultValues,
  values,
  resetOptions,
  resolver,
  shouldFocusError = true,
  shouldUnregister,
  shouldUseNativeValidation,
  criteriaMode = 'all',
  delayError,
  ...props
}: HookFormProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const config = useHookFormConfig({ ns, lng, loadingRender, inputProps, formHelperProps });
  const { render: Form } = config;
  const [loading, setLoading] = useState(false);

  const customErrorsRef = useRef<HookFormCustomErrors<T>>({});

  const setCustomError = useCallback((field: keyof T | string, err: HookFormCustomError | null) => {
    customErrorsRef.current[field] = (err == null || !err ? undefined : err);
  }, []);

  const setCustomErrors = useCallback((errs: HookFormCustomErrors<T>) => {
    Object.keys(errs).forEach(key => setCustomError(key, errs[key]));
  }, [setCustomError]);

  const autoId = useAutoId(ns);

  const basicForm = useForm<T>({
    mode,
    reValidateMode,
    defaultValues,
    values,
    resetOptions,
    resolver,
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    criteriaMode,
    delayError,
  });

  const onSubmitValid: SubmitHandler<T> = useCallback(async (data) => {
    if (loading) return;
    setLoading(true);

    let keepLoading: unknown | boolean;
    if (typeof onSubmit === 'function') {
      keepLoading = await onSubmit(data, ctx);
    }
    if (keepLoading !== true) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, onSubmit]);

  const onSubmitInvalid: SubmitErrorHandler<T> = useCallback((errors) => {
    if (typeof onInvalid === 'function') {
      onInvalid(errors, ctx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onInvalid]);

  const setGeneralError = useCallback((message: string | undefined) => {
    // @ts-ignore generalErrorKey
    basicForm.setError(generalErrorKey, { type: 'custom', message });
  }, [basicForm, generalErrorKey]);

  const ctx: HookFormContext<T> = useMemo(() => ({
    ...basicForm,
    autoId,
    config,
    customErrors: customErrorsRef.current,
    setCustomError,
    setCustomErrors,
    setGeneralError,
    loading,
    setLoading,
    gap,
    generalErrorKey,
    formSubmit  : () => basicForm.handleSubmit(onSubmitValid, onSubmitInvalid),
    validateReturn,
  }), [basicForm, autoId, config, setCustomError, setCustomErrors, setGeneralError, loading, gap, generalErrorKey, onSubmitValid, onSubmitInvalid]);

  useEffect(() => {
    setLoading(outerLoading);
  }, [outerLoading]);

  return (
    <FormProvider {...ctx}>
      <Form {...props} ref={ref}>
        {typeof children === 'function' ? createElement(children, ctx) : children}
      </Form>
    </FormProvider>
  );
}

export const HookForm = forwardRef(HookFormGeneric) as <T extends FieldValues = FieldValues>(
  props: HookFormProps<T> & { ref?: ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof HookFormGeneric<T>>;

export function useHookForm<T extends FieldValues = FieldValues>(): HookFormContext<T> {
  return useFormContext() as HookFormContext<T>;
}
