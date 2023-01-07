import React, { ReactNode, useMemo } from 'react';
import { Flex, FlexProps } from '../Flex';
import { decimalAdjust, filterNumeric, MuiComponentProps } from '../utils';

export type PriceDisplayProps = MuiComponentProps<{
  value?: string | number,
  defaultValue?: number,
  adjust?: false | 'round' | 'ceil' | 'floor',
  precision?: number,
  thousandSeparator?: string | false,
  // 0 原始模式
  // 1 小数位补位
  floatMode?: number,
  prefix?: ReactNode | ReactNode[],
  suffix?: ReactNode | ReactNode[],
} & FlexProps>

export function PriceDisplay({
  value,
  defaultValue = 0,
  adjust = 'round',
  precision = 2,
  thousandSeparator = ',',
  floatMode = 1,
  prefix,
  suffix,
  inline = true,
  items = 'baseline',
  ...props
}: PriceDisplayProps) {
  const floatZero = useMemo(() => {
    if (precision > 0) {
      return '0'.repeat(Math.abs(precision));
    }
    return '';
  }, [precision]);

  const _adjust: PriceDisplayProps['adjust'] = useMemo(() => {
    if (precision > 0) {
      return !adjust ? 'round' : adjust;
    }
    return adjust;
  }, [adjust, precision]);

  const [int, float] = useMemo(() => {
    let v = filterNumeric(value, defaultValue);
    if (_adjust !== false) {
      v = decimalAdjust(_adjust, v, precision > 0 ? -precision : 0);
    }
    let [v1, v2] = `${v}`.split('.');
    if (floatMode > 0) {
      if (!v2) {
        v2 = floatZero;
      } else if (precision > 0 && precision > v2.length) {
        v2 = v2 + '0'.repeat(precision - v2.length);
      }
    }
    if (!v1) {
      v1 = '0';
    } else if (v1.length > 3 && thousandSeparator !== false) {
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      v1 = v1.replace(thousands, thousandSeparator);
    }
    return [v1, v2];
  }, [value, defaultValue, _adjust, precision, thousandSeparator, floatZero, floatMode]);

  return (
    <Flex {...{ ...props, inline, items }}>
      {prefix ? (<span className="prefix">{prefix}</span>) : null}
      <span className="value">
        <span className="int">{int}</span>
        {precision > 0 && float ? (
          <span className="float"><span className="dot">.</span>{float}</span>
        ) : null}
      </span>
      {suffix ? (<span className="suffix">{suffix}</span>) : null}
    </Flex>
  );
}
