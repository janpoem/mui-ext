/**
 * 是否为数字
 * @param v - 要检查的值
 */
export const isNumeric = (v: unknown): boolean => {
  if (Array.isArray(v)) return false;
  return !isNaN(parseFloat(v as string)) && isFinite(v as number);
};

/**
 * 过滤 value 为整型值
 * @param value -
 * @param dft - 默认值，这里不会检查该值是否为一个 int ，请确保该值为 number 类型
 */
export const filterNumeric = (value: unknown, dft = 0): number => {
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  if (!isNumeric(value)) return dft;
  // try return value as original
  if (typeof value === 'number') return value;
  return parseFloat(value as string);
};

/**
 * 以最小值过滤 value 为整型值
 * @param value -
 * @param min - 最小值
 * @param dft - 默认值
 */
export const filterNumericWithMin = (value: unknown, min: number, dft = 0): number => {
  const v = filterNumeric(value, dft);
  return v < min ? min : v;
};

/**
 * 以最大值过滤 value 为整型值
 * @param value -
 * @param max - 最大值
 * @param dft - 默认值
 */
export const filterNumericWithMax = (value: unknown, max: number, dft = 0): number => {
  const v = filterNumeric(value, dft);
  return v > max ? max : v;
};

/**
 * 以最小最大值过滤 value 为整型值
 * @param value -
 * @param min - 最小值
 * @param max - 最大值
 * @param dft - 默认值
 */
export const filterNumericWithMinMax = (value: unknown, min: number, max: number, dft = 0): number => {
  const v = filterNumeric(value, dft);
  return v < min ? min : (v > max ? max : v);
};

export function random(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

// https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/round
export function decimalAdjust(
  type: 'round' | 'ceil' | 'floor',
  value: number,
  exp?: number,
): number {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  // @ts-ignore value to string
  value = value.toString().split('e');
  // @ts-ignore here
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  // @ts-ignore value to string
  value = value.toString().split('e');
  // @ts-ignore here
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// exp 表示精确位数，
// < 0 时，表示浮点精度
// > 0 时，表示个十百千位（即往上取舍）
export const round10 = (value: number, exp?: number): number => decimalAdjust('round', value, exp);
export const floor10 = (value: number, exp?: number): number => decimalAdjust('floor', value, exp);
export const ceil10 = (value: number, exp?: number): number => decimalAdjust('ceil', value, exp);

