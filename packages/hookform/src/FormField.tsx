import { SxProps, Theme } from '@mui/material';
import React, { cloneElement, createElement, ReactNode, useCallback, useMemo } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  Controller,
} from 'react-hook-form';
import { Message } from 'react-hook-form/dist/types/errors';
import { isElement, isValidElementType } from 'react-is';
import { FormFieldError } from './FormFieldError';
import { getRegInput, isRegInput, UserInput } from './Input';
import { Label } from './Label';
import { useHookForm } from './useHookForm';

type FieldEvent = {
  type: string,
  target: { name: string, value: unknown }
}

type ValidateResult = Message | boolean | undefined | void;
type Validate<TFieldValue> = (value: TFieldValue) => ValidateResult | Promise<ValidateResult>;

export type FieldRules = Partial<{
  required: boolean,
  min: number,
  max: number,
  minLength: number,
  maxLength: number,
  pattern: RegExp,
  validate: Validate<unknown>,
  onChange?: (event: FieldEvent) => void,
  onBlur?: (event: FieldEvent) => void,
}>

export type InputProps = {
  [k: string]: unknown,
}

export type InputPropsCallback = ((field: ControllerRenderProps, state: ControllerFieldState) => InputProps);

export type FormFieldProps = {
  name: string,
  label?: string,
  tip?: ReactNode | ReactNode[],
  rules?: FieldRules,
  input?: string | UserInput,
  children?: ReactNode,
  inputProps?: InputProps | InputPropsCallback,
  placeholder?: string,
  sx?: SxProps<Theme>,
}

export function FormField({
  name,
  label,
  tip,
  rules,
  input,
  children,
  inputProps,
  placeholder,
  sx,
}: FormFieldProps) {
  const { autoId, control, customErrors, validateReturn } = useHookForm();
  const fieldId = `${autoId}_${name}`;
  const { validate, ...rulesRest } = rules || {};

  const memoLabel = useMemo(() => <Label name={name} rules={rules}>{label}</Label>, [label, name, rules]);

  const fieldValidate = useCallback(async (value: unknown) => {
    let ret: ValidateResult | Error;
    if (typeof validate === 'function') {
      try {
        ret = await validate(value);
      } catch (err) {
        ret = err instanceof Error ? err : new Error(`${err}`);
      }
    }
    return validateReturn(ret ?? customErrors[name]);
  }, [validate, customErrors, name, validateReturn]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ ...rulesRest, validate: fieldValidate }}
        render={function ControlledFormFieldRender({ field, fieldState }) {
          const props = useCallback(() => {
            return {
              ...field,
              ...(typeof inputProps === 'function' ? inputProps(field, fieldState) : (inputProps || {})),
              id: fieldId,
              placeholder,
              // fieldState,
              // formState,
              label: memoLabel,
              sx,
            };
          }, [field, fieldState]);

          let userInput: UserInput | undefined;
          if (typeof input === 'string' && isRegInput(input)) {
            userInput = getRegInput(input);
          }

          const el = userInput ?? (input || children);

          if (isElement(el)) {
            return cloneElement(el, props());
          } else if (isValidElementType(el)) {
            return createElement(el, props());
          }

          return <div>Unknown input type</div>;
        }}
      />
      <FormFieldError field={name} tip={tip}/>
    </>
  );
}
