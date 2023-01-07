import { HookFormCustomError } from './types';

const validatePass = true;

export const validateReturn = (err: HookFormCustomError | boolean | null): string | boolean => {
  if (typeof err === 'boolean') return err;
  if (err != null) {
    if (typeof err === 'string') return err || validatePass;
    if (err instanceof Error) return err.message;
    return 'unknown error';
  }
  return validatePass;
};

