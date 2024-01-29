import { Paper, Table, TableContainer } from '@mui/material';
import { FoodDataValues } from '../FoodsPage';
import CustomHeaderRow from './rows/CustomHeaderRow';
import FoodTableBody from './FoodTableBody';

interface FoodTableProps {
  foodData: FoodDataValues[];
  createFoodIsOpen: boolean;
  setCreateFoodIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function FoodTable({
  foodData,
  createFoodIsOpen,
  setCreateFoodIsOpen,
}: FoodTableProps) {
  return (
    <TableContainer sx={{ mt: '1rem' }} component={Paper}>
      <Table aria-label='food data table'>
        <CustomHeaderRow />
        <FoodTableBody
          createFoodIsOpen={createFoodIsOpen}
          setCreateFoodIsOpen={setCreateFoodIsOpen}
          foodData={foodData}
        ></FoodTableBody>
      </Table>
    </TableContainer>
  );
}

export default FoodTable;
