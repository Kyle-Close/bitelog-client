import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FoodDataValues } from './FoodsPage';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

export function FoodTable({ foodData }: { foodData: FoodDataValues[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log(foodData);
  return (
    <>
      <TableContainer sx={{ mt: '2rem' }}>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Edit</TableCell>
              <TableCell>Name</TableCell>
              <TableCell size='small'>Ingredients</TableCell>
              <TableCell align='center' size='small'>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodData.slice(rowsPerPage * currentPage, rowsPerPage * currentPage + rowsPerPage).map((food, key) => {
              return (
                <TableRow key={key}>
                  <TableCell align='center'>
                    <EditIcon />
                  </TableCell>
                  <TableCell>{food.name}</TableCell>
                  <TableCell>ingredients</TableCell>
                  <TableCell align='center'>
                    <DeleteIcon color='error' />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component='div'
        count={foodData.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={(e, newPage) => setCurrentPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />
    </>
  );
}
