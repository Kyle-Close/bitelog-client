import { TableRow, TableCell, Collapse } from '@mui/material';
import UpdateFoodForm from './UpdateFoodForm';
import { FoodDataValues } from '../../../FoodsPage';

interface ExpandedRowUpdateFoodProps {
  open: boolean;
  food: FoodDataValues;
}

function ExpandedRowUpdateFood({ open, food }: ExpandedRowUpdateFoodProps) {
  return (
    <TableRow sx={{ p: 0 }}>
      <TableCell sx={{ p: 0 }} colSpan={6}>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <UpdateFoodForm food={food} />
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

export default ExpandedRowUpdateFood;
