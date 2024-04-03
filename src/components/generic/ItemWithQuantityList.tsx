import { Box, IconButton } from '@mui/material';
import ItemWithQuantity from './ItemWithQuantity';
import { IFoods } from '../../hooks/useFetchUserFood';
import { SelectedFoods } from '../../reducers/EatLogFormReducer';
import DeleteIcon from '@mui/icons-material/Delete';

interface ItemWithQuantity extends IFoods {
  quantity: number;
}

interface ItemWithQuantityListProps {
  items: SelectedFoods[];
  handleChange: (id: number, newQuantity: number) => void;
  handleDelete: (id: number) => void;
}
function ItemWithQuantityList({
  items,
  handleChange,
  handleDelete,
}: ItemWithQuantityListProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {items.map((item) => (
        <Box sx={{ display: 'flex', gap: '1rem' }} key={item.id}>
          <ItemWithQuantity
            name={item.name}
            quantity={item.quantity}
            handleChange={(newQuantity) => handleChange(item.id, newQuantity)}
          />
          <IconButton
            onClick={() => handleDelete(item.id)}
            sx={{ flexGrow: 1 }}
          >
            <DeleteIcon color='error' />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}

export default ItemWithQuantityList;
