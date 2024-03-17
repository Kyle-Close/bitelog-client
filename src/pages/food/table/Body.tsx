import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableBody, TableRow, Typography } from '@mui/material';
import { IFoods } from '../../../hooks/useFetchUserFood';
import DeleteIcon from '@mui/icons-material/Delete';
import { ReadMore } from '../../../components/generic/ReadMore';
import EditIcon from '@mui/icons-material/Edit';
import { useScreenSize } from '../../../hooks/useScreenSize';

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

export function FoodTableBody({ foods, rowsPerPage, currentPage }: FoodTableBodyProps) {
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
    <TableBody>
      {foods.slice(rowsPerPage * currentPage, rowsPerPage * currentPage + rowsPerPage).map((food, key) => {
        const ingredients = food.ingredients.join(', ');
        return (
          <StyledTableRow key={key}>
            <StyledTableCell align='center'>
              <EditIcon />
            </StyledTableCell>
            <StyledTableCell>
              <Typography sx={foodNameStyles}>{food.name}</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <ReadMore
                typographyOptions={foodIngredientStyles}
                text={ingredients}
                charLimit={ingredientsCharLimit()}
              />
            </StyledTableCell>
            <StyledTableCell align='center'>
              <DeleteIcon color='error' />
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
    </TableBody>
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
