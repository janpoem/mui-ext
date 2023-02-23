# StackDialog

可堆叠的全局 Dialog 容器。

包含三个内容：

- `useInitStackDialog`，生成全局 Dialog 控制器的方法集合实例，并将此实例传入 `StackDialog`。
- `StackDialog`，全局注入的可堆叠 Dialog 容器，基于 [mui Dialog](https://mui.com/material-ui/react-dialog/)
- `setupStackDialog`，统一配置 Dialog 的外观和样式。

## 应用全局初始化

使用类似 [notistack](https://www.npmjs.com/package/notistack)：

```tsx
import { ReactComponentProps, StackDialog, useInitStackDialog, UseStackDialog } from '@mui-ext/core';
import { SnackbarProvider } from 'notistack';
import { createContext, useContext } from 'react';

export type AppInjectionContext = {
  dialog: UseStackDialog,
}

// @ts-ignore Context Data Init
const Context = createContext<AppInjectionContext>({});

export function AppInjection({ children }: ReactComponentProps<unknown>) {
  const dialog = useInitStackDialog({ maxStack: 10 });

  return (
    <Context.Provider value={{ dialog }}>
      <SnackbarProvider maxSnack={5}>
        {children}
        <StackDialog dialog={dialog}/>
      </SnackbarProvider>
    </Context.Provider>
  )
}

export function useAppInjection(): AppInjectionContext {
  return useContext<AppInjectionContext>(Context);
}
```

## Usage

通过上述例子的 `useAppInjection` 或者其他方式获取的 `dialog: UseStackDialog` 实例，主要包含有以下的方法：

```typescript
export type OpenDialogAction = {
  text: string,
  onClick?: (e: MouseEvent<HTMLButtonElement>, dialog: UseStackDialog) => void,
} & Omit<ButtonProps, 'onClick'>

// dialog.open 的参数
export type OpenDialogArgs<P = AnyProps> = {
  key?: string,
  title?: ReactNode | null,
  content: DialogContent<P & { dialog: UseStackDialog }>,
  actions?: OpenDialogAction[],
  backdropClose?: boolean,
  // persistent?: boolean,
  minWidth?: number | string,
  dividers?: boolean,
  maxWidth?: DialogProps['maxWidth'],
  props?: P,
  onClose?: () => void,
  transition?: DialogProps['TransitionComponent'],
  scroll?: DialogProps['scroll'],
  fullScreen?: boolean,
  keepCurrent?: boolean,
};

// dialog.alert 的参数
export type OpenAlertArgs = Omit<OpenDialogArgs, 'actions'> & {
  onConfirm?: (e: MouseEvent<HTMLButtonElement>, dialog: UseStackDialog) => void,
  confirmText?: string,
};

// dialog.confirm 的参数
export type OpenConfirmArgs = OpenAlertArgs & {
  onCancel?: (e: MouseEvent<HTMLButtonElement>, dialog: UseStackDialog) => void,
  cancelText?: string,
};

export type InitStackDialogOptions = {
  maxStack?: number,
  closeDelay?: number,
  maxWidth?: DialogProps['maxWidth'],
}

export type UseStackDialog = {
  options: InitStackDialogOptions,
  isOpen: boolean,
  shouldOpen(key: string): boolean,
  stack: DialogItem[],
  current: string | undefined,
  open<P = AnyProps>(args: OpenDialogArgs<P>): void,
  close(isDrop?: boolean | null): void,
  remove(key: string): void,
  alert(args: OpenAlertArgs): void,
  confirm(args: OpenConfirmArgs): void,
  setLoading(loading: boolean): void,
}
```

一般用法：

```tsx
dialog.open({
  // 如果制定了 key，表示该 dialog 为持久化的弹出层，关闭时不会被自动移除
  key    : 'dialog_1',
  title  : 'Dialog 标题',
  content: <div>Dialog 内容</div>,
  actions: [
    { text: '按钮1', onClick: () => console.log('on click') }
  ],
  // 点击 dialog 背景 backdrop 是否触发 dialog 关闭，默认为 true
  backdropClose: true,
  // Dialog 是否以分隔线形式呈现
  dividers: true,
  // Dialog 是否以全屏模式呈现
  fullScreen: true,
  // 保持上一个 Dialog
  keepCurrent: true,
  // 针对 mui maxWidth 设置
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  // 指定最小宽度
  minWidth: 320
});

dialog.alert({
  // 格式同上
  confirmText: '确认',
  onConfirm  : () => console.log('on confirm'),
});

dialog.confirm({
  // 格式同上
  confirmText: '确认',
  cancelText : '取消',
  onConfirm  : () => console.log('on confirm'),
  onCancel   : () => console.log('on cancel'),
});

// 针对当前已打开的弹出层，显示 loading 状态（包含 Dialog Content 的 backdrop）
dialog.setLoading(true | false);
```

## Setup

```typescript
export type StackDialogConfig = Partial<{
  confirmText: string,
  cancelText: string,
  transition: DialogProps['TransitionComponent'],
  dividers: boolean,
  maxWidth: DialogProps['maxWidth'] | undefined,
  minWidth: number,
  scroll: DialogProps['scroll'],
  loadingProps: CircularProgressProps,
  buttonProps: StackDialogButtonProps,
  titleProps: DialogTitleProps,
  contentProps: DialogContentProps,
  actionsProps: DialogActionsProps,
}>

// 以下仅是从某个项目中取出的例子
setupStackDialog({
  maxWidth    : 'lg',
  minWidth    : 480,
  confirmText : '确认',
  cancelText  : '取消',
  buttonProps : { variant: 'contained' },
  titleProps  : {
    sx: { color: '#000000' },
  },
  actionsProps: {
    sx: {
      flexDirection : 'row-reverse',
      justifyContent: 'end',
      gap           : '0.5em',
    },
  },
});
```
