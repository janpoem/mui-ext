import React, { useMemo } from 'react';

export type UnknownDisplayProps = {
  value: unknown,
  convert?: (value: unknown) => string,
}

export function UnknownDisplay({ value, convert }: UnknownDisplayProps) {
  const _value = useMemo(() => convert != null ? convert(value) : value, [value, convert]);

  if (_value == null) return null;
  switch (typeof _value) {
    case 'string' :
    case 'number' :
    case 'boolean' :
      return <>{`${_value}`}</>;
  }
  return null;
}
