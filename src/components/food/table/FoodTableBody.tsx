import { FoodDataValues } from '../FoodsPage';
import ExpandedRow from './expanded/ExpandedRow';
import Row from './rows/Row';

interface FoodTableBodyProps {
  foodData: FoodDataValues[];
  createFoodIsOpen: boolean;
}

function FoodTableBody({ foodData, createFoodIsOpen }: FoodTableBodyProps) {
  return (
    <>
      <ExpandedRow open={createFoodIsOpen}>Some content</ExpandedRow>
      {foodData.map((food) => {
        return <Row food={food} />;
      })}
    </>
  );
}

export default FoodTableBody;
