# Flex

Flex 布局组件，关联两个组件：

- Flex
- FlexChild

## Props

[FlexChild.tsx](../../packages/core/src/Flex/FlexChild.tsx#L8)

```typescript
type FlexChildProps = {
  // flex ，如 '1 1 50%'
  flex?: Property.Flex,
  // flex-grow
  grow?: FlexGrowShrink,
  // flex-shrink
  shrink?: FlexGrowShrink,
  // flex-basis
  basis?: Property.FlexBasis | number,
  // HtmlComponentProps
  children?: ReactNode | ReactNode[],
  style?: CSSProperties | undefined,
  className?: string | undefined,
  // MuiComponentProps
  sx?: SxProps<Theme>
}
```

[Flex.tsx](../../packages/core/src/Flex/Flex.tsx#L8)

```typescript
type FlexProps = {
  // 是否为 inline-flex
  inline?: boolean,
  // 是否为 flex-direction column，默认为 row
  col?: boolean,
  // 是否为 reverse，flex-direction column-reverse 或 row-reverse
  rev?: boolean,
  // justify-content
  justify?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly' | undefined,
  // align-items
  items?: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline' | 'normal',
  // gap
  // 当输入为 number 类型时，表示 1 => 1em, 0.5 => 0.5em
  // 当输入为 string 类型时，则取其具体值 '1px' => 1px, '1rem' => 1rem
  gap?: number | string | null,
  children?: ReactNode | ReactNode[],
  // 是否隐藏，hide display = 'none'
  hide?: boolean,
  // flex-wrap true | false | undefined
  wrap?: boolean,
  // FlexChildProps
  flex?: Property.Flex,
  grow?: boolean | number | undefined | null,
  shrink?: boolean | number | undefined | null,
  basis?: Property.FlexBasis | number,
  // HtmlComponentProps
  children?: ReactNode | ReactNode[],
  style?: CSSProperties | undefined,
  className?: string | undefined,
  // MuiComponentProps
  sx?: SxProps<Theme>
};
```

## Usage

```tsx
<Flex gap={1} wrap={false} justify={'between'}>
  <FlexChild flex={'1 1 50%'}>
    50%
  </FlexChild>
  <FlexChild flex={'1 1 30%'}>
    30%
  </FlexChild>
</Flex>
```

一般根据实际使用情况决定是否使用 `FlexChild` ，不是硬性限定。
