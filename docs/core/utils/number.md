# number

## isNumeric

是否为数字类型

```typescript
declare const isNumeric: (v: unknown) => boolean;
```

## filterNumeric

过滤任意类型为数字类型，非数字类型时，使用 `dft` 的值，`dft` 未指定时，默认为 `0`。

```typescript
declare const filterNumeric: (value: unknown, dft?: number) => number;
```

## filterNumericWithMin / filterNumericWithMax / filterNumericWithMinMax

```typescript
/**
 * 以最小值过滤 value 为整型值
 * @param value -
 * @param min - 最小值
 * @param dft - 默认值
 */
declare const filterNumericWithMin: (value: unknown, min: number, dft?: number) => number;
/**
 * 以最大值过滤 value 为整型值
 * @param value -
 * @param max - 最大值
 * @param dft - 默认值
 */
declare const filterNumericWithMax: (value: unknown, max: number, dft?: number) => number;
/**
 * 以最小最大值过滤 value 为整型值
 * @param value -
 * @param min - 最小值
 * @param max - 最大值
 * @param dft - 默认值
 */
declare const filterNumericWithMinMax: (value: unknown, min: number, max: number, dft?: number) => number;
```

## random

在最小-最大之间取随机值。

```typescript
declare function random(min: number, max: number): number;
```

## decimalAdjust / round10 / floor10 / ceil10

取自：[MDN - 小数舍入](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round#%E5%B0%8F%E6%95%B0%E8%88%8D%E5%85%A5)

`exp` 表示为精确的位数，取值 `+x` ~  `-x`，诸如：

- 2 表示十位
- 1 表示个位
- -1 表示十分位
- -2 表示百分位
- -3 表示千分位
- .... 以此类推

```typescript
declare function decimalAdjust(
  type: "round" | "ceil" | "floor", 
  value: number, 
  exp?: number
): number;

declare const round10: (value: number, exp?: number) => number;
declare const floor10: (value: number, exp?: number) => number;
declare const ceil10: (value: number, exp?: number) => number;
```
