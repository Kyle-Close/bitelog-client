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
import { useContext, useState } from 'react';
import { UserContext } from '../../context';
import { convertToLocalDate, deleteDataFromBackend, fetchDataFromBackend } from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GoToHome from '../../components/generic/GoToHome';
import AddIngredientModalContent from './AddIngredientModal';
import BasicModal from '../../components/generic/BasicModal';
import DeleteIngredientModalContent from './DeleteIngredientModalContent';

interface CurrentIngredient {
  name: string;
  id: number;
}

function IngredientsPage() {
  const { user } = useContext(UserContext);
  const [isCreateIngredientModalOpen, setIsCreateIngredientModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [currentIngredient, setCurrentIngredient] = useState<CurrentIngredient>({ name: '', id: 0 });

  const { data, error, isLoading } = useQuery({
    queryKey: ['ingredients', user?.uid],
    queryFn: () => fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/ingredients`),
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDataFromBackend,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients', user?.uid] });
    },
  });

  if (error) {
    return <Typography>Error fetching user ingredients</Typography>;
  }

  if (deleteMutation.isError) {
    return <Typography>Error deleting ingredient</Typography>;
  }

  if (deleteMutation.isPending) {
    return <Typography>Mutation pending...</Typography>;
  }

  if (isLoading || !data) {
    return <Typography>Loading ingredients...</Typography>;
  }

  const handleDelete = (id: number) => {
    if (!user) return;

    const url = BASE_URL + `/user/${user.uid}/ingredients/${id}`;
    deleteMutation.mutate(url);
  };

  const mapRows = () => {
    return data.ingredients.map((row: { id: number; name: string; createdAt: string }) => (
      <TableRow key={row.id}>
        <TableCell>{row.name.toLowerCase()}</TableCell>
        <TableCell>{convertToLocalDate(row.createdAt)}</TableCell>
        <TableCell>
          <Button
            onClick={() => {
              setCurrentIngredient({ name: row.name, id: row.id });
              setIsDeleteModalOpen(true);
            }}
          >
            <DeleteIcon color='error' />
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  const handleBtnClick = () => {
    setIsCreateIngredientModalOpen(true);
  };

  const handleClose = () => {
    setIsCreateIngredientModalOpen(false);
  };

  return (
    <Box sx={{ p: '1rem' }}>
      <BasicModal isOpen={isCreateIngredientModalOpen} onClose={handleClose} title='Create Ingredient'>
        <AddIngredientModalContent />
      </BasicModal>

      <BasicModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title='Delete Ingredient'>
        <DeleteIngredientModalContent
          handleDelete={handleDelete}
          handleClose={() => setIsDeleteModalOpen(false)}
          currentIngredient={currentIngredient}
        />
      </BasicModal>

      <Box sx={{ display: 'flex', gap: '2rem', alignItems: 'end' }}>
        <Typography variant='h5'>Ingredients</Typography>
      </Box>

      <TableContainer sx={{ mt: '1rem' }} component={Paper}>
        <Table stickyHeader size='small' sx={{ maxWidth: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Ingredient</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ backgroundColor: 'rgba(39, 245, 82, 0.40)' }}>
              <TableCell colSpan={3}>
                <Button onClick={handleBtnClick} sx={{ display: 'flex', flexGrow: 1, minWidth: '100%' }}>
                  <AddCircleOutlineIcon />
                </Button>
              </TableCell>
            </TableRow>
            {mapRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default IngredientsPage;
