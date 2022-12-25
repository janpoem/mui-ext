import { ElementType, ReactElement, ReactNode } from 'react';
import { RefCallBack } from 'react-hook-form/dist/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UserInputProps<V = any> = {
  id?: string,
  label?: ReactNode,
  placeholder?: string,
  name?: string,
  value?: V,
  onChange?: ((value: V) => void) | ((...event: any[]) => void),
  onBlur?: () => void,
  ref?: RefCallBack
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UserInput<V = any, P = any> =
  | ReactElement<Partial<UserInputProps<V>> & P>
  | ElementType<Partial<UserInputProps<V>> & P>

export type InputRegistryType = {
  [k: string]: UserInput
}

const InputRegistry: InputRegistryType = {};

export const isRegInput = (key: string): boolean => InputRegistry[key] != null;

export function regInput(key: string, input: UserInput): void {
  InputRegistry[key] = input;
}

export const getRegInput = (key: string): UserInput | undefined => InputRegistry[key];
