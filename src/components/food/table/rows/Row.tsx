import { TableRow, TableCell, Collapse, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandRowCell from '../expanded/ExpandRowCell';
import { FoodDataValues } from '../../FoodsPage';
import { useState } from 'react';
import ExpandedRow from '../expanded/update-food/ExpandedRowUpdateFood';
import UpdateFoodForm from '../expanded/update-food/UpdateFoodForm';
import DeleteFood from '../expanded/DeleteFood';
export interface RowProps {
  food: FoodDataValues;
}

export interface ExpandedRow {
  isOpen: boolean;
  component: React.ReactNode | null;
}

function Row({ food }: RowProps) {
  const [expandedRow, setExpandedRow] = useState<ExpandedRow>({
    isOpen: false,
    component: null,
  });

  return (
    <>
      <TableRow>
        <ExpandRowCell
          expandedRow={expandedRow}
          setExpandedRow={setExpandedRow}
          food={food}
        />
        <TableCell>{food.name}</TableCell>
        <TableCell align='right'>
          <Button
            onClick={() =>
              setExpandedRow({
                component: <UpdateFoodForm food={food} />,
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
      </TableRow>
      <ExpandedRow open={expandedRow.isOpen} food={food}>
        {expandedRow.component}
      </ExpandedRow>
    </>
  );
}

export default Row;