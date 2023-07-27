import React, { ComponentProps, ForwardedRef, forwardRef } from 'react';
import { useClsx } from '../hooks';
import { MuiComponentProps } from '../utils';
import { AspectInner, AspectInnerProps, AspectOuter, AspectOuterProps } from './styled';

export type AspectProps = MuiComponentProps<AspectOuterProps & AspectInnerProps & ComponentProps<'div'>>

export const Aspect = forwardRef(function Aspect({
  children,
  className,
  ...rest
}: AspectProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <AspectOuter className={useClsx('aspect-outer', className)} {...rest}>
      {/* @ts-ignore ref */}
      <AspectInner ref={ref} className={'inner'}>{children}</AspectInner>
    </AspectOuter>
  );
})
