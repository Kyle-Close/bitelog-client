import { TableHead, TableRow, Typography } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

export function FoodTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell sx={cellClasses} align='center'>
          <Typography sx={textClasses} variant='h6'>
            Edit
          </Typography>
        </StyledTableCell>
        <StyledTableCell>
          <Typography sx={textClasses} variant='h6'>
            Name
          </Typography>
        </StyledTableCell>
        <StyledTableCell size='small'>
          <Typography sx={textClasses} variant='h6'>
            Ingredients
          </Typography>
        </StyledTableCell>
        <StyledTableCell sx={cellClasses} align='center' size='small'>
          <Typography sx={textClasses} variant='h6'>
            Delete
          </Typography>
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
}

const cellClasses = {
  px: {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  },
};

const textClasses = {
  fontSize: {
    xs: '0.75rem',
    sm: '0.85rem',
    md: '0.95rem',
    lg: '1.1rem',
  },
};
