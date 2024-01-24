import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts';
import {
  convertToLocalDate,
  deleteDataFromBackend,
  fetchDataFromBackend,
} from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import GoToHome from './GoToHome';

function IngredientsPage() {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['ingredients', user?.uid],
    queryFn: () =>
      fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/ingredients`),
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDataFromBackend,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients', user?.uid] });
    },
  });

  if (isLoading) {
    return <Typography>Loading ingredients...</Typography>;
  }

  if (error) {
    return <Typography>Error fetching user ingredients</Typography>;
  }

  if (deleteMutation.isError) {
    return <Typography>Error deleting ingredient</Typography>;
  }

  if (deleteMutation.isPending) {
    return <Typography>Mutation pending...</Typography>;
  }

  const handleDelete = (id: number) => {
    if (!user) return;

    const url = BASE_URL + `/user/${user.uid}/ingredients/${id}`;
    deleteMutation.mutate(url);
  };

  const mapRows = () => {
    return data.ingredients.map(
      (row: { id: number; name: string; createdAt: string }) => (
        <TableRow key={row.id}>
          <TableCell align='center'>{row.name.toLowerCase()}</TableCell>
          <TableCell align='center'>
            {convertToLocalDate(row.createdAt)}
          </TableCell>
          <TableCell align='center'>
            <Button onClick={() => handleDelete(row.id)}>
              <DeleteIcon color='error' />
            </Button>
          </TableCell>
        </TableRow>
      )
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: '3rem' }}>
        <GoToHome url={`/user/${user?.uid}/journal/${user?.journalId}`} />
        <Typography variant='h5'>Ingredients</Typography>
      </Box>

      <TableContainer sx={{ mt: '1rem' }} component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Ingredient</TableCell>
              <TableCell align='center'>Date Added</TableCell>
              <TableCell align='center'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{mapRows()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default IngredientsPage;
