import { TableBody } from '@mui/material';
import { FoodDataValues } from '../FoodsPage';
import ExpandedRow from './expanded/ExpandedRow';
import FoodForm from './expanded/FoodForm';
import Row from './rows/Row';
import { useState } from 'react';

interface FoodTableBodyProps {
  foodData: FoodDataValues[];
  createFoodIsOpen: boolean;
}

export interface ExpandedRow {
  isOpen: boolean;
  component: React.ReactNode | null;
}

function FoodTableBody({ foodData, createFoodIsOpen }: FoodTableBodyProps) {
  // Build the array of rows. Either, ExpandedRow or Row
  const [expandedRow, setExpandedRow] = useState<ExpandedRow>({
    isOpen: false,
    component: null,
  });
  return (
    <TableBody>
      <ExpandedRow open={createFoodIsOpen}>
        <FoodForm method='POST' />
      </ExpandedRow>
      {foodData.map((food) => {
        return <Row food={food} />;
      })}
    </TableBody>
  );
}

export default FoodTableBody;
