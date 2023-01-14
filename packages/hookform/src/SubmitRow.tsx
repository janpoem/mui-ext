import { Flex, FlexChild, FlexProps, MuiComponentProps } from '@mui-ext/core';
import { Button, ButtonProps } from '@mui/material';
import React, { ReactNode, useCallback } from 'react';
import { FormFieldError } from './FormFieldError';
import { useHookForm } from './useHookForm';

export type SubmitRowProps = MuiComponentProps<{
  submitText?: ReactNode | ReactNode[],
  cancelText?: ReactNode | ReactNode[],
  resetText?: ReactNode | ReactNode[],
  enableReset?: boolean,
  onReset?: () => void,
  onCancel?: () => void,
  grow?: boolean,
  size?: ButtonProps['size'],
  variant?: ButtonProps['variant'],
  forceReset?: boolean,
  gap?: number | string,
} & FlexProps>

const buttonProps = (color: ButtonProps['color'], {
  disabled,
  grow = false,
  variant,
  size,
}: Partial<ButtonProps> & { grow?: boolean }): Partial<ButtonProps> => ({
  color  : color ?? 'primary',
  disabled,
  variant: variant ?? 'contained',
  size   : size ?? 'medium',
  sx     : { flexGrow: grow ? 1 : undefined },
});

export function SubmitRow({
  submitText,
  cancelText,
  resetText,
  enableReset = false,
  onReset,
  onCancel,
  grow,
  size,
  variant,
  forceReset,
  gap,
  children,
  ...props
}: SubmitRowProps) {
  const form = useHookForm();
  const { config, reset, formState, loading: disabled, gap: formGap, formSubmit, generalErrorKey } = form;

  const btnProps = { grow, size, variant };

  const onClickReset = useCallback(() => {
    reset();
    onReset && onReset();
  }, [reset, onReset]);

  const onClickCancel = useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);

  return (
    <Flex col>
      <Flex items="start" {...props} gap={gap ?? formGap}>
        <Button
          type={'submit'}
          onClick={formSubmit()}
          {...buttonProps('primary', { ...btnProps, disabled })}
        >
          {submitText || config.submitText}
        </Button>
        {enableReset && (
          <Button
            type={'reset'}
            onClick={onClickReset}
            {...buttonProps('secondary', {
              ...btnProps,
              disabled: forceReset ? false : !formState.isDirty,
            })}
          >
            {resetText || config.resetText}
          </Button>
        )}
        {onCancel && (
          <Button
            type={'button'}
            onClick={onClickCancel}
            {...buttonProps('secondary', {
              ...btnProps,
              disabled: false,
            })}
          >
            {cancelText || config.cancelText}
          </Button>
        )}
        {children && (
          <FlexChild grow={1}>
            {children}
          </FlexChild>
        )}
      </Flex>
      <FormFieldError field={generalErrorKey} sx={{ textAlign: grow ? 'center' : undefined }}/>
    </Flex>
  );
}
