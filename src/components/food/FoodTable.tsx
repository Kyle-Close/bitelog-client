import { Paper, Table, TableContainer } from '@mui/material';
import { FoodDataValues } from './FoodsPage';
import CustomHeaderRow from './CustomHeaderRow';
import FoodTableBody from './FoodTableBody';

interface FoodTableProps {
  foodData: FoodDataValues[];
}

function FoodTable({ foodData }: FoodTableProps) {
  return (
    <TableContainer sx={{ mt: '1rem' }} component={Paper}>
      <Table aria-label='food data table'>
        <CustomHeaderRow />
        <FoodTableBody foodData={foodData}></FoodTableBody>
      </Table>
    </TableContainer>
  );
}

export default FoodTable;
