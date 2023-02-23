# HighlightText

高亮文本搜索显示。

## Props

```typescript
type HighlightTextProps<E extends ElementType = 'span', P = ElementTypeProps<E>> = {
  // text or children ，必须是字符串类型，原始文本值
  text?: string,
  children?: string,
  // 搜索文本值
  search?: string,
  // 自定义呈现 Tag
  tag?: E,
  // 追加前缀内容
  prefix?: ReactNode | ReactNode[],
  // 追加后追内容
  suffix?: ReactNode | ReactNode[],
  // 自定义高亮颜色
  // 默认使用 mui 的 theme.palette.error.main
  color?: string,

  // HtmlComponentProps
  style?: CSSProperties | undefined,
  className?: string | undefined,
  // MuiComponentProps
  sx?: SxProps<Theme>
}
```

## Reference

[Mui Palette](https://mui.com/material-ui/customization/palette/)

## Usage

```tsx
<HighlightText search={'abc'} tag={'code'}>
  Abc123
</HighlightText>
```

