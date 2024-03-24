import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/material';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface ChipsArrayProps {
  chipData: string[];
  deleteData: (ingredient: string) => void;
}

export default function ChipsArray({ chipData, deleteData }: ChipsArrayProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component='ul'
    >
      {chipData.map((data, key) => {
        let icon;

        return (
          <ListItem key={key}>
            <Chip
              color='warning'
              icon={icon}
              label={data}
              onDelete={() => deleteData(data)}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}
