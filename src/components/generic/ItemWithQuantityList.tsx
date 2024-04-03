import { useState } from 'react';
import { Box } from '@mui/material';
import ItemWithQuantity from './ItemWithQuantity';
import { IFoods } from '../../hooks/useFetchUserFood';
import { SelectedFoods } from '../../reducers/EatLogFormReducer';

interface ItemWithQuantity extends IFoods {
  quantity: number;
}

interface ItemWithQuantityListProps {
  items: SelectedFoods[];
  handleChange: (id: number, newQuantity: number) => void;
}
function ItemWithQuantityList({
  items,
  handleChange,
}: ItemWithQuantityListProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {items.map((item, key) => (
        <ItemWithQuantity
          key={key}
          name={item.name}
          quantity={item.quantity}
          handleChange={(newQuantity) => handleChange(item.id, newQuantity)}
        />
      ))}
    </Box>
  );
}

export default ItemWithQuantityList;
