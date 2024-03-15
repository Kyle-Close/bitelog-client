import { useState } from 'react';
import { Table, TableContainer, TablePagination } from '@mui/material';
import { IFoods } from '../../../hooks/useFetchUserFood';
import { FoodTableHeader } from './Header';
import { FoodTableBody } from './Body';

interface FoodTableProps {
  foods: IFoods[];
}

export function FoodTable({ foods }: FoodTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <TableContainer>
      <Table stickyHeader>
        <FoodTableHeader />
        <FoodTableBody foods={foods} currentPage={currentPage} rowsPerPage={rowsPerPage} />
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component='div'
        count={foods.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={(e, newPage) => setCurrentPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />
    </TableContainer>
  );
}
