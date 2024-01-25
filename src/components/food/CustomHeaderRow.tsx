import { TableCell, TableHead, TableRow } from '@mui/material';

function CustomHeaderRow() {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell>Food Name</TableCell>
        <TableCell align='center'>Update</TableCell>
        <TableCell align='center'>Delete</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default CustomHeaderRow;
