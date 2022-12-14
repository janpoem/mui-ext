import React from 'react';
import { useClsx } from '../hooks';
import { MuiComponentProps } from '../utils';
import { AspectInner, AspectInnerProps, AspectOuter, AspectOuterProps } from './styled';

export type AspectProps = MuiComponentProps<AspectOuterProps & AspectInnerProps> & React.ComponentProps<'div'>

export function Aspect({
  children,
  className,
  ...rest
}: AspectProps) {
  return (
    <AspectOuter className={useClsx('aspect-outer', className)} {...rest}>
      {children ? <AspectInner className={'inner'}>{children}</AspectInner> : null}
    </AspectOuter>
  );
}
