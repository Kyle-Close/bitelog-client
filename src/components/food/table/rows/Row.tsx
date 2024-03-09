import { TableRow, TableCell, Collapse, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandRowCell from '../expanded/ExpandRowCell';
import { FoodDataValues } from '../../FoodsPage';
import { useState } from 'react';
import ExpandedRow from '../expanded/ExpandedRow';
import FoodForm from '../expanded/FoodForm';
import DeleteFood from '../expanded/DeleteFood';
export interface RowProps {
  food: FoodDataValues;
}

function Row({ food }: RowProps) {
  return (
    <TableRow>
      <ExpandRowCell expandedRow={expandedRow} setExpandedRow={setExpandedRow} food={food} />
      <TableCell>{food.name}</TableCell>
      <TableCell align='right'>
        <Button
          onClick={() =>
            setExpandedRow({
              component: <FoodForm food={food} method='POST' />,
              isOpen: true,
            })
          }
        >
          <EditIcon color='info' />
        </Button>
      </TableCell>
      <TableCell align='right'>
        <Button
          onClick={() =>
            setExpandedRow({
              component: <DeleteFood food={food} />,
              isOpen: true,
            })
          }
        >
          <DeleteIcon color='error' />
        </Button>
      </TableCell>
      <ExpandedRow open={expandedRow.isOpen} food={food}>
        {expandedRow.component}
      </ExpandedRow>
    </TableRow>
  );
}

export default Row;
