import { TableCell, TableHead, TableRow, Typography } from '@mui/material';

export function FoodTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={cellClasses} align='center'>
          <Typography sx={textClasses} variant='h6'>
            Edit
          </Typography>
        </TableCell>
        <TableCell>
          <Typography sx={textClasses} variant='h6'>
            Name
          </Typography>
        </TableCell>
        <TableCell size='small'>
          <Typography sx={textClasses} variant='h6'>
            Ingredients
          </Typography>
        </TableCell>
        <TableCell sx={cellClasses} align='center' size='small'>
          <Typography sx={textClasses} variant='h6'>
            Delete
          </Typography>
        </TableCell>
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
