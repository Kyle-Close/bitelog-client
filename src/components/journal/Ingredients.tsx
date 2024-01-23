import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import { fetchDataFromBackend } from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';

function IngredientsPage() {
  const { user } = useContext(UserContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ['ingredients', user?.uid],
    queryFn: () =>
      fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/ingredients`),
    enabled: !!user,
  });

  if (isLoading) {
    return <Typography>Loading ingredients...</Typography>;
  }

  if (error) {
    return <Typography>Error fetching user ingredients</Typography>;
  }

  console.log(data.ingredients);

  return (
    <TableContainer sx={{ mt: '1rem' }} component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Ingredient</TableCell>
            <TableCell>Date Added</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{/* Map over the row data here. */}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default IngredientsPage;
