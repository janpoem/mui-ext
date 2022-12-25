import { ComponentOrElement, Flex } from '@mui-ext/core';
import { Box } from '@mui/material';
import React, { cloneElement, createElement, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';
import { isElement, isValidElementType } from 'react-is';
import { FormField, FormFieldProps } from './FormField';
import { HookForm, HookFormProps } from './HookForm';
import { SubmitRow, SubmitRowProps } from './SubmitRow';

export type FormGeneratorFields = (FormFieldProps | undefined | null)[];

export type FormLayoutItem = string | ComponentOrElement | undefined;

export type FormLayoutRow = FormLayoutItem | FormLayoutItem[];

export type FormGeneratorProps<T extends FieldValues = FieldValues> = {
  fields?: FormGeneratorFields,
  layout?: FormLayoutRow[],
  submitProps?: SubmitRowProps,
} & HookFormProps<T>;

export function FormGenerator<T extends FieldValues = FieldValues>({
  fields,
  layout,
  submitProps,
  gap = 1,
  ...formProps
}: FormGeneratorProps<T>) {
  const filterFields = useMemo(() => (
    fields == null ? [] : fields.filter(Boolean)
  ) as FormFieldProps[], [fields]);

  return (
    <HookForm {...formProps}>
      <Flex col gap={gap}>
        {layout && layout.length > 0 ? (
          layout.map((item, idx) => (
            <FormRow key={`y_${idx}`} gap={gap} row={item} index={idx} fields={filterFields}/>
          ))
        ) : (
          filterFields.map((field, fieldIdx) => (
            <Box key={`field_${fieldIdx}`}>
              <FormField {...field} />
            </Box>
          ))
        )}
        <SubmitRow {...submitProps} />
      </Flex>
    </HookForm>
  );
}

function useGapAsMarginPadding(gap?: number | string) {
  return useMemo(() => {
    const match = `${gap || 1}`.match(/^([\d]+(?:\.[\d]+)?)(\\%|[a-z]{1,4})?$/);
    let num = match ? parseFloat(match[1]) : 1, unit = match ? (match[2] || '').toLowerCase() : '';
    if (unit === '%') {
      num = 1;
      unit = 'rem';
    } else if (['vw', 'vh', 'vmin', 'vmax'].includes(unit)) {
      num = 1;
      unit = 'rem';
    } else if (['ex', 'ch', 'lh'].includes(unit)) {
      unit = 'rem';
    }
    return { margin: `-${num / 2}${unit}`, padding: `${num / 2}${unit}` };
  }, [gap]);
}

type FormRowProps = {
  row: FormLayoutRow,
  index: number,
  fields: FormFieldProps[],
  gap?: number | string,
}

function FormRow({ row, index, fields, gap = 1 }: FormRowProps) {
  const items = useMemo(() => {
    if (!Array.isArray(row)) {
      if (!row) return [];
      return [row];
    }
    return row.filter(Boolean);
  }, [row]);
  const size = items.length;

  const { margin } = useGapAsMarginPadding(gap);

  if (!size) return null;
  if (size === 1) {
    return <FormItem item={items[0]} fields={fields} gap={gap}/>;
  }

  return (
    <Flex style={{ margin }}>
      {items.map((item, idx) => (
        <FormItem key={`y_${index}_x_${idx}`} item={item} fields={fields} x={items.length} gap={gap}/>
      ))}
    </Flex>
  );
}

type FormItemProps = {
  item: FormLayoutItem,
  fields: FormFieldProps[],
  x?: number,
  gap?: number | string,
}

function FormItem({ item, fields, x = 1, gap = 1 }: FormItemProps) {
  const field = useMemo(() => {
    if (typeof item === 'string') {
      return fields.find(it => it.name === item);
    }
    return undefined;
  }, [item, fields]);

  const { padding } = useGapAsMarginPadding(gap);

  if (typeof item === 'function') {
    if (isValidElementType(item)) {
      return createElement(item);
    }
  } else if (isElement(item)) {
    return cloneElement(item);
  }

  if (field == null) {
    return null;
  }

  if (x === 1) {
    return (
      <Box>
        <FormField {...field} />
      </Box>
    );
  } else {
    return (
      <Flex col basis={`${1 / x * 100}%`} style={{ width: `${1 / x * 100}%`, padding }}>
        <FormField {...field} />
      </Flex>
    );
  }
}
