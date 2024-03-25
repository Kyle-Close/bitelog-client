import { useState } from 'react';
import { Table, TableContainer, TablePagination } from '@mui/material';
import { IngredientType } from '../../../hooks/useFoodForm';
import { IngredientTableHeader } from './Header';
import { IngredientTableBody } from './Body';

interface IngredientTableProps {
  ingredients: IngredientType[];
}

export function IngredientTable({ ingredients }: IngredientTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  return (
    <TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 50, 100]}
        component='div'
        count={ingredients.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={(e, newPage) => setCurrentPage(newPage)}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
      />
      <Table sx={{ mb: '2rem' }} stickyHeader>
        <IngredientTableHeader />
        <IngredientTableBody
          ingredients={ingredients}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}
