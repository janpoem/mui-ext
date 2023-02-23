# SimpleTable

一个简易的基于 Mui 默认样式实现的 Table 容器。

- 支持泛型定义 Table 字段。
- 支持分页
- 自带 Loading 和 NonIdealState

## 基础类型声明

```typescript
type AnyRecord = Record<string, unknown>;

// 表字段类型声明
type Column<D extends AnyRecord, Key extends keyof D> = {
  // 对应的数据字段
  key: Key,
  // 单元格对齐方式
  align?: TableCellAlign,
  // 表头内容，如无，使用 key
  header?: ReactNode,
  // 获取该字段的值 getter 方法，用于获取较为复杂的属性
  getter?: (row: D, key: Key) => unknown,
  // 字段值进行转换处理，转换结果必须是字符串类型
  convert?: (value: unknown) => string,
  // 自定义渲染器
  render?: ComponentOrElement<{
    key: Key,
    row: D,
    rowIndex: number,
    column: Column<D, Key>,
    value: unknown
  }>,
}

// 分页数据结构
export type PaginationInfo = {
  /**
   * 当前页
   */
  page: number,
  /**
   * 最后一夜
   */
  lastPage: number,
  perPage: number,
}

export type SimpleTableColumn<D extends AnyRecord> = Column<D, keyof D>

export type SimpleTableProps<D extends AnyRecord = AnyRecord> = MuiComponentProps<{
  container?: ElementType,
  columns: SimpleTableColumn<D>[],
  data?: D[],
  pagination?: PaginationInfo,
  loading?: boolean,
  reloading?: boolean,
  loadingProps?: Omit<LoadingProps, 'loading'>,
  tableProps?: TableProps,
  nonIdealProps?: Omit<NonIdealStateProps, 'ready'>,
  onChangePage?: (page: number) => void,
}>
```

## Usage

```tsx
type ExampleData = {
  id: number,
  name: string,
  type: number,
  price?: number,
  createdAt: Date,
}

const columns: SimpleTableColumn<ExampleData>[] = [
  { key: 'id' },
  { key: 'name' },
  { key: 'type', align: 'center', render: ({ row }) => <TypeDisplay value={row.type}/> },
  { key: 'price', align: 'right', render: ({ row }) => <PriceDisplay prefix={'￥'} value={row.price ?? 0}/> },
  { key: 'createdAt', getter: (row) => row.createdAt.toDateString() },
];

<SimpleTable
  columns={columns}
  data={data}
  loading={loading}
  pagination={{ page, lastPage, perPage }}
  nonIdealProps={{
    title      : 'No Example Data',
    description: 'The data was gone...',
  }}
/>
```
