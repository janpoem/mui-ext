import React, { ElementType, ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Pagination from '@mui/material/Pagination';
import Backdrop from '@mui/material/Backdrop';
import { TableProps } from '@mui/material';
import { Flex } from '../Flex';
import { useAutoId } from '../hooks';
import { Loading, LoadingProps } from '../Loading';
import { NonIdealState, NonIdealStateProps } from '../NonIdealState';
import { UnknownDisplay } from '../Text';
import { ComponentOrElement, mountOrClone, MuiComponentProps } from '../utils';
import { TableCellAlign, Th, Td, TableBodyRow } from './styled';

type AnyRecord = Record<string, unknown>;

type Column<D extends AnyRecord, Key extends keyof D> = {
  key: Key,
  align?: TableCellAlign,
  header?: ReactNode,
  getter?: (row: D, key: Key) => unknown,
  convert?: (value: unknown) => string,
  // value?: Value,
  render?: ComponentOrElement<{
    key: Key,
    row: D,
    rowIndex: number,
    column: Column<D, Key>,
    value: unknown
  }>,
}

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

export function SimpleTable<D extends AnyRecord = AnyRecord>({
  container,
  columns,
  data,
  pagination,
  loading = false,
  reloading = false,
  loadingProps,
  tableProps,
  nonIdealProps,
  onChangePage,
}: SimpleTableProps<D>) {

  const autoId = useAutoId('tb');

  return (
    <Loading {...loadingProps} loading={loading && !reloading}>
      <NonIdealState {...nonIdealProps} ready={data != null && data.length > 0}>
        <TableContainer component={container ?? Paper} sx={{ position: 'relative' }}>
          <Backdrop open={reloading} sx={{ position: 'absolute' }}>
            <CircularProgress/>
          </Backdrop>
          <Table {...tableProps}>
            <TableHead>
              <TableRow>
                {columns.map(({ key, align, header }, idx) => (
                  <Th
                    key={`${autoId}_h${key as string}`}
                    variant={'head'}
                    theLast={idx === columns.length - 1}
                    align={align}
                  >{header || (key as string)}</Th>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, rowIndex) => (
                <TableBodyRow key={`${autoId}_r${rowIndex}`}>
                  {columns.map((column, idx) => {
                    const value = column.getter ? column.getter(row, column.key) : (row[column.key] ?? undefined);
                    return (
                      <Td
                        key={`${autoId}_r${rowIndex}_${column.key as string}_${idx}`}
                        variant={'body'}
                        theLast={idx === columns.length - 1}
                        align={column.align}
                      >
                        {column.render ? mountOrClone(column.render, {
                          key: column.key,
                          row,
                          rowIndex,
                          column,
                          value,
                        }) : (
                          <UnknownDisplay value={value} convert={column.convert}/>
                        )}
                      </Td>
                    );
                  })}
                </TableBodyRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination != null ? (
          <Flex justify={'center'} style={{ margin: '0.5em 0' }}>
            <Pagination
              count={pagination.lastPage}
              page={pagination.page}
              color="primary"
              disabled={loading}
              onChange={(e, p) => onChangePage && onChangePage(p)}
            />
          </Flex>
        ) : null}
      </NonIdealState>
    </Loading>

  );
}
