import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useScreenSize } from '../../hooks/useScreenSize';
import { IFoods } from '../../hooks/useFetchUserFood';
import { ReadMore } from '../../components/generic/ReadMore';

interface FoodTableProps {
  foods: IFoods[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  paddingTop: '2rem',
  paddingBottom: '2rem',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function FoodTable({ foods }: FoodTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
      <TableContainer sx={{ mt: '2rem' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: '2rem' }} align='center'>
                <Typography variant='h6'>Edit</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>Name</Typography>
              </TableCell>
              <TableCell size='small'>
                <Typography variant='h6'>Ingredients</Typography>
              </TableCell>
              <TableCell sx={{ px: '2rem' }} align='center' size='small'>
                <Typography variant='h6'>Delete</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foods.slice(rowsPerPage * currentPage, rowsPerPage * currentPage + rowsPerPage).map((food, key) => {
              const ingredients = food.ingredients.join(', ');
              return (
                <StyledTableRow key={key}>
                  <StyledTableCell sx={{ py: '2rem' }} align='center'>
                    <EditIcon />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography>{food.name}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <ReadMore text={ingredients} charLimit={ingredientsCharLimit()} />
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <DeleteIcon color='error' />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component='div'
        count={foods.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={(e, newPage) => setCurrentPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />
    </>
  );
}
