import { FieldValues, useFormContext } from 'react-hook-form';
import { HookFormContext } from './types';

export function useHookForm<T extends FieldValues = FieldValues>(): HookFormContext<T> {
  return useFormContext() as HookFormContext<T>;
}
