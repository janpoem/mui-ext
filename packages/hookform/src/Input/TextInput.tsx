import { TextField } from '@mui/material';
import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { regInput, UserInputProps } from './InputRegistry';
import { MuiInputSharedProps, useMuiInputSharedProps } from './mui';

export type TextInputProps = UserInputProps<string> & MuiInputSharedProps & {
  type?: string,
  multiline?: boolean,
};

export const TextInput = forwardRef(function TextInput(
  { type, multiline, value, onChange, ...props }: TextInputProps,
  ref: ForwardedRef<HTMLInputElement>) {
  return <TextField
    {...useMuiInputSharedProps()}
    {...props}
    value={useStringValue(value)}
    // @ts-ignore onChange
    onChange={onChange}
    type={type}
    multiline={multiline}
    fullWidth={true}
    inputRef={ref}
  />;
});

export function useStringValue(value: string | number | undefined | null): string {
  return useMemo(() => value == null ? `` : `${value}`, [value]);
}

regInput('text', <TextInput type="text" multiline={false}/>);
regInput('password', <TextInput type="password" multiline={false}/>);
regInput('textarea', <TextInput type="text" multiline={true}/>);
