import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface EatLogTableProps {
  foodData: {
    name: string;
    id: number;
    quantity: number;
  }[];
}

export function EatLogTable({ foodData }: EatLogTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size='small' aria-label='a dense table'>
        <TableHead sx={{ bgcolor: 'black' }}>
          <TableRow>
            <TableCell>Food Item</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foodData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell>{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
