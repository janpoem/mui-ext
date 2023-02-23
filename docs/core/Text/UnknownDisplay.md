# UnknownDisplay

未知类型的输出显示，这里的 unknown 针对的是 TS 的 unknown type。

该组件仅会输出 `typeof` 为 `string` or `number` or `boolean` 类型的字面值，其他类型一律输出为 `null`。

## Props

```typescript
type UnknownDisplayProps = {
  // 任意类型值
  value: unknown,
  // 自定义值转换方法，必须转换为字符串类型
  convert?: (value: unknown) => string,
}
```
