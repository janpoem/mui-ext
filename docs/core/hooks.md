# Hooks

## useAutoId

根据前缀 `prefix` 生成全局唯一 ID。

```typescript
declare function useAutoId(prefix?: string): string
```

## useClsx

基于 [clsx](https://www.npmjs.com/package/clsx) 拼接多个 className

```typescript
declare type ClassNameType = string | null | undefined;

declare function useClsx(...cls: ClassNameType[]): string
```

## useSnackbarNotice

基于 [notistack](https://www.npmjs.com/package/notistack) 实现的窗口通知的呈现。

请确保在全局添加了 `<SnackbarProvider>`，一般会在全局 AppRoot 来挂载这个组件。

`useSnackbarNotice` 主要提供几个特定的方法，以简化调用。

[SnackbarOptions 参考](https://notistack.com/api-reference#mutual-props)

```typescript
declare function useSnackbarNotice(defaultOptions?: SnackbarOptions): {
  notice: (m: SnackbarMessage, o?: SnackbarOptions) => SnackbarKey;
  success: (m: SnackbarMessage, o?: SnackbarOptions) => SnackbarKey;
  warning: (m: SnackbarMessage, o?: SnackbarOptions) => SnackbarKey;
  error: (m: SnackbarMessage, o?: SnackbarOptions) => SnackbarKey;
  info: (m: SnackbarMessage, o?: SnackbarOptions) => SnackbarKey;
  close: (key?: SnackbarKey) => void;
};
```

### Usage

应用根节点挂载。

```typescript jsx
{/* 一般插入在 AppRoot 节点上 */}
<SnackbarProvider maxSnack={6}>
  <DemoPage/>
</SnackbarProvider>
```

具体组件内调用

```typescript jsx
export function DemoPage() {
  const { error } = useSnackbarNotice();

  return (
    <div>
      <button onClick={() => error('Error message!')}>Show Error Notify</button>
    </div>
  )
}
```
