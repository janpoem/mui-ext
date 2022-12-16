import { styled } from '@mui/material';
import { TableCell, TableCellProps, TableRow, TableRowProps } from '@mui/material';
import { StyledComponent } from '@mui/styles';

export const TableBodyRow: StyledComponent<TableRowProps> = styled(TableRow)(({ theme }) => ({
  transition: 'background-color 300ms',
  '&:hover' : {
    backgroundColor: theme.palette.action.hover,
  },
  '&:active': {
    backgroundColor: theme.palette.action.selected,
  },
}));

export type TableCellAlign = 'center' | 'left' | 'right';

type CellProps = {
  theLast?: boolean,
  align?: TableCellAlign,
}

export const Td: StyledComponent<TableCellProps & CellProps> = styled(TableCell, {
  shouldForwardProp: (propName) => !['theLast', 'align'].includes(propName as string),
})<CellProps>(({ theLast, align }) => ({
  padding  : '0.5rem 1rem',
  textAlign: align || (theLast ? 'right' : undefined),
}));

export const Th: StyledComponent<TableCellProps & CellProps> = styled(Td, {
  shouldForwardProp: (propName) => !['theLast', 'align'].includes(propName as string),
})<CellProps>(() => ({
  fontSize: '0.9em',
}));

