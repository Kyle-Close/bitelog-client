import { TableRow, TableCell, Collapse, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandRowCell from './ExpandRowCell';
import { FoodDataValues } from './FoodsPage';
import { useState } from 'react';
import ExpandedSection from './ExpandedSection';

interface RowProps {
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <ExpandedSection foodId={food.id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;
