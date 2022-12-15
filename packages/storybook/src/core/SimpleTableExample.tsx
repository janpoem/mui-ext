import { PriceDisplay, random, SimpleTable, SimpleTableColumn } from '@mui-ext/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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

export type SimpleTableExampleProps = {
  total?: number,
}

export function SimpleTableExample({ total = 100 }: SimpleTableExampleProps) {
  const [allData, setAllData] = useState<ExampleData[] | undefined>(undefined);

  const [data, setData] = useState<ExampleData[] | undefined>(undefined);
  const [loadTimes, setLoadTimes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [perPage] = useState(20);

  const generateData = useCallback((count: number) => {
    return new Array(count).fill(null).map((_, idx) => ({
      id       : idx + 1,
      name     : 'name-' + random(10000, 99999),
      type     : random(0, 10),
      price    : random(0, 100) > 50 ? random(1000, 2000) / random(1, 9) : undefined,
      createdAt: new Date,
    }));
  }, []);

  const mockLoad = useCallback((p: number) => {
    return new Promise<void>((resolve) => {
      if (allData == null) {
        return;
      }
      setLoading(true);
      setTimeout(() => {
        if (p < 1) p = 1;
        const start = p - 1;
        const end = start + perPage;
        setData(allData.slice(start, end));
        setLoading(false);
        setLoadTimes(prev => prev + 1);
        setPage(p);
        setLastPage(Math.ceil(allData.length / perPage));
        resolve();
      }, 500);
    });
  }, [allData, perPage]);

  useEffect(() => {
    if (allData != null && data == null) {
      mockLoad(1);
    }
  }, [allData, data, mockLoad]);

  useEffect(() => {
    if (allData == null) {
      setAllData(generateData(total));
    }
  }, [allData, generateData, total]);

  return (
    <SimpleTable
      columns={columns}
      data={data}
      loading={loading}
      reloading={loading && loadTimes > 0}
      pagination={{ page, lastPage, perPage }}
      nonIdealProps={{
        title      : 'No Example Data',
        description: 'The data was gone...',
      }}
      onChangePage={(p) => mockLoad(p)}
    />
  );
}

function TypeDisplay({ value }: { value: number }) {
  const text = useMemo(() => {
    switch (value) {
      case 0 :
        return '初始化';
      case 1 :
        return '确定';
      case 2 :
        return '待确认';
      case 3 :
        return '取消';
      default :
        return '未知';
    }
  }, [value]);

  return <>{text}</>;
}
