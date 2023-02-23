# Aspect

以特定宽高比例（ratio）呈现一个 box 元素。

`ratio` 默认为 `1` （即 1/1）， 取值格式为 `width / height`

有时候设计使用了不规范的 ratio ，不管任何比例的（宽高），都可作为 ratio 的值，比如 `ratio={750/240}` 。

box 自动根据父元素 100% 撑开。

## Props

ref:
- [styled.tsx](../../packages/core/src/Aspect/styled.tsx)
- [Aspect.tsx](../../packages/core/src/Aspect/Aspect.tsx)

```typescript
type AspectProps = {
  // AspectOuterProps
  ratio?: number,
  bg?: string,
  bgColor?: Property.BackgroundColor,
  bgPosition?: string,
  bgSize?: Property.BackgroundSize,
  bgRepeat?: Property.BackgroundRepeat,
  // AspectInnerProps
  // HtmlComponentProps
  children?: ReactNode | ReactNode[],
  style?: CSSProperties | undefined,
  className?: string | undefined,
  // MuiComponentProps
  sx?: SxProps<Theme>
}
```

## Usage

```typescript jsx
<Aspect ratio={16/9} bg={'http://imageUrl'}>
  <div>
    Content
  </div>
</Aspect>
```

