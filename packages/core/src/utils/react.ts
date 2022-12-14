import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import {
  ReactElement,
  ReactNode,
  cloneElement,
  createElement,
  CSSProperties,
  BaseSyntheticEvent,
  ComponentType,
} from 'react';
import { isElement, isValidElementType } from 'react-is';

export type ReactComponent<P> = ComponentType<P>

export type ReactComponentProps<P> = {
  children?: ReactNode | ReactNode[],
} & P;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HtmlComponentProps<P = any> = {
  children?: ReactNode | ReactNode[],
  style?: CSSProperties | undefined,
  className?: string | undefined,
} & P;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MuiComponentProps<P = any> = HtmlComponentProps<{
  sx?: SxProps<Theme>
}> & P;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ComponentOrElement<P = {}> = ReactComponent<P> | ReactElement<P>;

// eslint-disable-next-line @typescript-eslint/ban-types
export function mountOrClone<P extends Record<string, unknown> = {}>(
  CE?: ComponentOrElement<P>,
  props?: P,
): ReactElement<P> | null {
  if (CE != null) {
    if (typeof CE === 'function') {
      if (isValidElementType(CE)) {
        return createElement(CE, props);
      }
    } else if (isElement(CE)) {
      return cloneElement(CE, props);
    }
  }
  return null;
}

export function extractErrorMessage(err: Error | string | unknown | undefined): string {
  if (err == null) return '';
  if (err instanceof Error) {
    return err.message;
  } else if (typeof err === 'string') {
    return err;
  }

  return '未知的错误';
}

export function stopDomEvent<E extends BaseSyntheticEvent = BaseSyntheticEvent>(e: E): Promise<E> {
  return new Promise((resolve) => {
    e.stopPropagation();
    e.preventDefault();
    resolve(e);
  });
}
