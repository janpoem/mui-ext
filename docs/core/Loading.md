# Loading

加载中包裹组件，减少组件中的逻辑判定。

当 `loading = true` 时，不会 render children。

以下的代码，在页面加载、不断点击【Change Loading】时，控制台将如何输出？

```tsx
function Test() {
  const renderRef = useRef(false);
  if (!renderRef.current) {
    renderRef.current = true;
    console.log('render');
  } else {
    console.log('re-render');
  }

  useEffect(() => {
    console.log('Test mount');

    return () => console.log('Test unmount');
  }, []);

  return <div>Test</div>;
}

export function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <button onClick={() => setLoading(prev => !prev)}>Change Loading</button>
      <Loading loading={loading}>
        <Test/>
      </Loading>
    </div>
  );
}
```

排除 react-refresh 的情形，控制台输出情况应该是：

1. 初次加载，`loading = true`，控制台什么也不输出。
2. 第一次点击【Change Loading】，`loading = false`，输出 `render` 和 `Test mount`
3. 第二次点击【Change Loading】，`loading = true`，输出 `Test unmount`

## Props

```typescript
type LoadingProps = MuiComponentProps<{
  // 是否加载中，默认为 true
  loading?: boolean,
  // 加载中的文本
  text?: ReactNode,
  // 自定义 Render
  render?: LoadingRender,
  // 自定义显示 placeholder
  placeholder?: ReactNode | ReactNode[],
  // 非 loading 下正常显示的内容
  children?: ReactNode | ReactNode[],
}>
```

## Usage

```tsx
<Loading loading={data != null && data.length > 0} text={'加载用户...'}>
  <DataList data={data}/>
</Loading>
```

## Setup

Loading 的全局设置。

```tsx
setupLoading({
  // 默认值为 loading...
  text: '加载中...',
  // 渲染器重载，默认的 Loading 渲染，只输出一个 Box 而已
  render: ({ children, ...props }) => (
    <Flex {...props} items={'center'} gap={1}>
      <CircularProgress size={20}/>
      {children}
    </Flex>
  )
})
```
