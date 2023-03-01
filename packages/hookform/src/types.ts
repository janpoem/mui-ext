import { ComponentOrElement, HtmlComponentProps, MuiComponentProps, ReactComponent } from '@mui-ext/core';
import { BoxProps } from '@mui/material';
import {
  BaseSyntheticEvent,
  ComponentProps,
  Dispatch,
  ElementType,
  ReactNode,
  SetStateAction,
} from 'react';
import { Field, FieldError, FieldValues, UseFormReturn } from 'react-hook-form';
import { MuiFormHelperProps } from './FormFieldError';
import { MuiInputSharedProps } from './Input';
import { validateReturn } from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormLoadingProps<P = any> = HtmlComponentProps<{ loading?: boolean } & P>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormLoading<P = any> = ComponentOrElement<FormLoadingProps<P>>

export type FormRenderProps<E extends ElementType = 'div'> = MuiComponentProps<{
  //
} & ComponentProps<E> & BoxProps>

export type FormRender<E extends ElementType = ElementType> = ReactComponent<FormRenderProps<E>>;

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

export type HookFormConfig = {
  ns: string,
  lng?: string,
  hookErrors: Partial<HookErrors>,
  render: FormRender,
  loadingRender: FormLoading,
  submitText: ReactNode | ReactNode[],
  cancelText: ReactNode | ReactNode[],
  resetText: ReactNode | ReactNode[],
  inputProps: MuiInputSharedProps,
  formHelperProps: MuiFormHelperProps,
  formTag: ElementType
}

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
