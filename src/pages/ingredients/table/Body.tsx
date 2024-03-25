import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { IconButton, TableBody, TableRow, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IngredientType } from '../../../hooks/useFoodForm';
import { convertToLocalDate } from '../../../helpers/utility';
import { useState } from 'react';
import { DeleteIngredient } from '../DeleteIngredient';
import { BaseModal } from '../../../components/generic/BaseModal';

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

interface IngredientTableBodyProps {
  ingredients: IngredientType[];
  rowsPerPage: number;
  currentPage: number;
}

export function IngredientTableBody({
  ingredients,
  rowsPerPage,
  currentPage,
}: IngredientTableBodyProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIngredient, setActiveIngredient] =
    useState<IngredientType | null>(null);

  const handleDeleteClick = (ingredient: IngredientType) => {
    setIsOpen(true);
    setActiveIngredient(ingredient);
  };

  return (
    <>
      {activeIngredient && (
        <BaseModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <DeleteIngredient
            ingredient={activeIngredient}
            handleClose={() => setIsOpen(false)}
          />
        </BaseModal>
      )}
      <TableBody>
        {ingredients
          .slice(
            rowsPerPage * currentPage,
            rowsPerPage * currentPage + rowsPerPage
          )
          .map((ingredient, key) => {
            return (
              <StyledTableRow key={key}>
                <StyledTableCell>
                  <Typography sx={ingredientNameStyles}>
                    {ingredient.name}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography sx={ingredientNameStyles}>
                    {convertToLocalDate(ingredient.createdAt)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <IconButton
                    onClick={() => {
                      handleDeleteClick(ingredient);
                    }}
                  >
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

const ingredientNameStyles = {
  fontSize: {
    xs: '0.8rem',
    sm: '0.9rem',
    md: '1rem',
    lg: '1.2rem',
  },
};
