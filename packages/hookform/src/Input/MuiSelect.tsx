import { useAutoId } from '@mui-ext/core';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { ForwardedRef, forwardRef, ReactNode, useMemo } from 'react';
import { regInput, UserInputProps } from './InputRegistry';
import { MuiInputSharedProps, useMuiInputSharedProps } from './mui';

type MaybeValue = string | number | undefined;

export type MuiSelectOption<V extends MaybeValue = MaybeValue> = {
  value: V,
  text: string,
  node?: ReactNode,
  disabled?: boolean,
  visible?: boolean,
  [k: string]: unknown,
}

export type MuiSelectProps<V extends MaybeValue = MaybeValue> = UserInputProps<V> & MuiInputSharedProps & {
  multiple?: boolean,
  options: MuiSelectOption<V>[],
}

function MuiSelectGeneric<V extends MaybeValue = MaybeValue>(
  {
    name,
    label,
    value,
    onChange,
    multiple = false,
    options,
    ...props
  }: MuiSelectProps<V>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const sharedProps = useMuiInputSharedProps();
  const id = useAutoId(name || 'mui_select');
  const labelId = `${id}_label`;

  return (
    <FormControl fullWidth size={sharedProps.size}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        {...sharedProps}
        {...props}
        labelId={labelId}
        label={label}
        id={id}
        name={name}
        inputRef={ref}
        value={useSelectValue(value, multiple)}
        // @ts-ignore onChange
        onChange={onChange}
        multiple={multiple}
      >
        {options.map((opt, idx) => (
          opt.visible === false ? null : (
            <MenuItem key={`${id}_${idx}`} disabled={opt.disabled} value={opt.value}>
              {opt.node || opt.text}
            </MenuItem>
          )
        ))}
      </Select>
    </FormControl>
  );
}

export const MuiSelect = forwardRef(MuiSelectGeneric) as <V extends MaybeValue = MaybeValue>(
  props: MuiSelectProps<V> & { ref?: ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof MuiSelectGeneric<V>>;

export function useSelectValue<V extends MaybeValue = MaybeValue,
  IsMultiple extends boolean = boolean,
  R = IsMultiple extends false ? V : V[]>(value: V | V[], multiple?: IsMultiple): R {

  return useMemo(() => {
    if (!multiple) {
      const v: V = Array.isArray(value) ? value[0] : value;
      return (v == null ? '' : v) as R;
    } else {
      if (value == null) return [] as R;
      return (Array.isArray(value) ? value : [value]) as R;
    }
  }, [value, multiple]);
}

regInput('select', MuiSelect);
