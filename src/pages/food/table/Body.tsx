import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { IconButton, TableBody, TableRow, Typography } from '@mui/material';
import { IFoods } from '../../../hooks/useFetchUserFood';
import DeleteIcon from '@mui/icons-material/Delete';
import { ReadMore } from '../../../components/generic/ReadMore';
import EditIcon from '@mui/icons-material/Edit';
import { useScreenSize } from '../../../hooks/useScreenSize';
import { BaseModal } from '../../../components/generic/BaseModal';
import { useState } from 'react';
import { DeleteFood } from '../DeleteFood';
import { FoodIngredientModal } from '../FoodIngredientModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  paddingTop: '1rem',
  paddingBottom: '1rem',
  [theme.breakpoints.up('sm')]: {
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#202020',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface FoodTableBodyProps {
  foods: IFoods[];
  rowsPerPage: number;
  currentPage: number;
}

export function FoodTableBody({
  foods,
  rowsPerPage,
  currentPage,
}: FoodTableBodyProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeFood, setActiveFood] = useState<IFoods | null>(null);

  const handleDeleteClick = (food: IFoods) => {
    setIsEditOpen(false);
    setIsDeleteOpen(true);
    setActiveFood(food);
  };

  const handleEditClick = (food: IFoods) => {
    setIsDeleteOpen(false);
    setIsEditOpen(true);
    setActiveFood(food);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const screenSize = useScreenSize();
  const ingredientsCharLimit = () => {
    switch (screenSize) {
      case 'xs':
        return 30;
      case 'sm':
        return 50;
      case 'md':
        return 100;
      case 'lg':
        return 150;
      case 'xl':
        return 250;
    }
  };
  return (
    <>
      {isDeleteOpen && activeFood && (
        <BaseModal isOpen={isDeleteOpen} handleClose={closeDeleteModal}>
          <DeleteFood food={activeFood} handleClose={closeDeleteModal} />
        </BaseModal>
      )}
      {isEditOpen && activeFood && (
        <FoodIngredientModal
          isOpen={isEditOpen}
          handleClose={closeEditModal}
          initialFoodFormState={createInitalFoodFormState(activeFood)}
          isUpdating={true}
          food={activeFood}
        />
      )}
      <TableBody>
        {foods
          .slice(
            rowsPerPage * currentPage,
            rowsPerPage * currentPage + rowsPerPage
          )
          .map((food, key) => {
            const ingredients = food.ingredients.map(
              (ingredient) => ingredient.name
            );
            return (
              <StyledTableRow key={key}>
                <StyledTableCell align='center'>
                  <IconButton onClick={() => handleEditClick(food)}>
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography sx={foodNameStyles}>{food.name}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <ReadMore
                    typographyOptions={foodIngredientStyles}
                    text={ingredients.join(', ')}
                    charLimit={ingredientsCharLimit()}
                  />
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <IconButton onClick={() => handleDeleteClick(food)}>
                    <DeleteIcon color='error' />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
      </TableBody>
    </>
  );
}

const foodNameStyles = {
  fontSize: {
    xs: '0.8rem',
    sm: '0.9rem',
    md: '1rem',
    lg: '1.2rem',
  },
};

const foodIngredientStyles = {
  fontSize: {
    xs: '0.6rem',
    sm: '0.7rem',
    md: '0.8rem',
    lg: '0.9rem',
  },
};

export const createInitalFoodFormState = (food: IFoods) => {
  return {
    foodName: food.name,
    autoCompleteValue: null,
    inputValue: '',
    selectedIngredients: food.ingredients,
  };
};
