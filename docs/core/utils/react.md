# react

## 类型

```typescript
export type ReactComponent<P> = ComponentType<P>

export type ReactComponentProps<P> = {
  children?: ReactNode | ReactNode[],
} & P;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HtmlComponentProps<P = any> = {
  children?: ReactNode | ReactNode[],
  style?: CSSProperties | undefined,
  className?: string | undefined,
} & P;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MuiComponentProps<P = any> = HtmlComponentProps<{
  sx?: SxProps<Theme>
}> & P;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ComponentOrElement<P = {}> = ReactComponent<P> | ReactElement<P>;
```

## mountOrClone

传入组件声明函数或组件实例（Component or Element），并指定特定 props ，以创建或克隆对应的组件实例。

```typescript
// eslint-disable-next-line @typescript-eslint/ban-types
declare function mountOrClone<P extends Record<string, unknown> = {}>(CE?: ComponentOrElement<P>, props?: P): ReactElement<P> | null;
```

## extractErrorMessage

提取 Error 的消息文本，针对 Typescript 新规范。

```typescript
declare function extractErrorMessage(err: Error | string | unknown | undefined): string;
```

```typescript
try {
  doSomeThing();
} catch (e) {
  console.log(extractErrorMessage(e));
}
```

## stopDomEvent

停止 DOM Event 冒泡。注意该方法以 promise 方式使用。

```typescript
declare function stopDomEvent<E extends BaseSyntheticEvent = BaseSyntheticEvent>(e: E): Promise<E>;
```

```typescript
const onClick = (ev) => stopDomEvent(ev).then(() => console.log('Then do something...'));
```
