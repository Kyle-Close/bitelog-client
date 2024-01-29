import { FoodDataValues } from '../FoodsPage';
import ExpandedRow from './expanded/ExpandedRow';
import FoodForm from './expanded/FoodForm';
import Row from './rows/Row';

interface FoodTableBodyProps {
  foodData: FoodDataValues[];
  createFoodIsOpen: boolean;
}

function FoodTableBody({ foodData, createFoodIsOpen }: FoodTableBodyProps) {
  return (
    <>
      <ExpandedRow open={createFoodIsOpen}>
        <FoodForm method='POST' />
      </ExpandedRow>
      {foodData.map((food) => {
        return <Row food={food} />;
      })}
    </>
  );
}

export default FoodTableBody;
