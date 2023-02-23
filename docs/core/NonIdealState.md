# NonIdealState

非理想状态（数据加载失败、异常报错等情形下）的渲染包裹器，机制原理形同 [Loading](Loading.md)。

## Props

```typescript
export type NonIdealStateProps = MuiComponentProps<{
  // 标题
  title?: ReactNode,
  // 描述
  description?: ReactNode | ReactNode[],
  // 是否准备好
  // true -> children
  // false -> 显示非理想状态
  ready?: boolean,
  render?: NonIdealStateRender,
} & FlexProps>
```

## Usage

一般和 Loading 混用，也可以单独使用

```tsx
<Loading loading={loading} text={'加载用户...'}>
  <NonIdealState
    ready={err != null || (data != null && data.length > 0)}
    title={'暂无数据'}
    description={extractErrorMessage(err) || '暂无用户数据'}
  >
    <DataList data={data}/>
  </NonIdealState>
</Loading>
```

## Setup

```tsx
setupNonIdealState({
  // 默认值为 Non Ideal
  title : '暂无内容',
  render: ({ title, children }) => (
    <div>
      <div>title: {title}</div>
      <div>description: {children}</div>
    </div>
  ),
})
```
