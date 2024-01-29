import { TableRow, TableCell, Collapse } from '@mui/material';
import { FoodDataValues } from '../../FoodsPage';

interface ExpandedRowProps {
  open: boolean;
  food?: FoodDataValues;
  children?: React.ReactNode;
}

function ExpandedRow({ open, children }: ExpandedRowProps) {
  return (
    <TableRow sx={{ p: 0 }}>
      <TableCell sx={{ p: 0 }} colSpan={6}>
        <Collapse in={open} timeout='auto' unmountOnExit>
          {children}
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

export default ExpandedRow;
