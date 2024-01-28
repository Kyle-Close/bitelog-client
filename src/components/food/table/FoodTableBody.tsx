import { FoodDataValues } from '../FoodsPage';
import Row from './rows/Row';

interface FoodTableBodyProps {
  foodData: FoodDataValues[];
}

function FoodTableBody({ foodData }: FoodTableBodyProps) {
  return foodData.map((food) => {
    return <Row food={food} />;
  });
}

export default FoodTableBody;