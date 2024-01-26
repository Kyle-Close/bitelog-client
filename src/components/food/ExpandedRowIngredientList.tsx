import { TableRow, TableCell, Collapse } from '@mui/material';
import ExpandedSection from './ExpandedSection';
import { FoodDataValues } from './FoodsPage';

interface ExpandedRowIngredientListProps {
  food: FoodDataValues;
  open: boolean;
}

function ExpandedRowIngredientList({
  food,
  open,
}: ExpandedRowIngredientListProps) {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <ExpandedSection foodId={food.id} />
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

export default ExpandedRowIngredientList;
