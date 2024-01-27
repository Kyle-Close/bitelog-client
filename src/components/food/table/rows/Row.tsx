import { TableRow, TableCell, Collapse, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandRowCell from '../expanded/ExpandRowCell';
import { FoodDataValues } from '../../FoodsPage';
import { useState } from 'react';
import ExpandedRowUpdateFood from '../expanded/update-food/ExpandedRowUpdateFood';

export interface RowProps {
  food: FoodDataValues;
}

function Row({ food }: RowProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow>
        <ExpandRowCell open={open} setOpen={setOpen} />
        <TableCell>{food.name}</TableCell>
        <TableCell align='right'>
          <Button>
            <EditIcon color='info' />
          </Button>
        </TableCell>
        <TableCell align='right'>
          <Button>
            <DeleteIcon color='error' />
          </Button>
        </TableCell>
      </TableRow>
      {/* <ExpandedRowIngredientList food={food} open={open} /> */}
      <ExpandedRowUpdateFood open={open} food={food} />
    </>
  );
}

export default Row;
