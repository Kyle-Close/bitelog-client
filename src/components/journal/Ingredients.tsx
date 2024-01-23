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

function IngredientsPage() {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['ingredients', { userId: user?.uid }],
    queryFn: () =>
      fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/ingredients`),
    enabled: !!user,
  });

  const { mutate } = useMutation({
    mutationFn: deleteDataFromBackend,
    onSuccess: async () => {
      console.log('success');
      if (user?.uid)
        await queryClient.invalidateQueries({
          queryKey: ['ingredients', { userId: user.uid }],
          exact: true,
          refetchType: 'all',
        });
    },
  });

  if (isLoading) {
    return <Typography>Loading ingredients...</Typography>;
  }

  if (error) {
    return <Typography>Error fetching user ingredients</Typography>;
  }

  const handleDelete = (id: number) => {
    if (!user) return;

    const url = BASE_URL + `/user/${user.uid}/ingredients/${id}`;
    mutate(url);
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
  );
}

export default IngredientsPage;
