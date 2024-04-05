import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SickIcon from '@mui/icons-material/Sick';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';

interface DiscomfortPickerProps {
  handleChange: (value: number) => void;
  initialState?: number;
}

export function DiscomfortPicker({
  handleChange,
  initialState,
}: DiscomfortPickerProps) {
  const [discomfortRating, setDiscomfortRating] = useState(
    initialState ? initialState : 0
  );
  const [colors, setColors] = useState<boolean[]>(
    setInitialColors(initialState)
  );

  const handleUpdate = (index: number) => {
    handleChange(0);
    if (discomfortRating - 1 === index && colors[index] === true) {
      setDiscomfortRating(0);
      setColors([false, false, false, false, false]);
    } else {
      handleChange(index + 1);
      setDiscomfortRating(index + 1);
      const newColorArray = colors.map((color, key) => {
        if (index >= key) return true;
        else return false;
      });
      setColors(newColorArray);
    }
  };

  function setInitialColors(rating?: number): boolean[] {
    const result: boolean[] = [false, false, false, false, false];

    if (typeof rating === 'number') {
      for (let i = 0; i < result.length; i++) {
        result[i] = i < rating;
      }
    }

    return result;
  }

  return (
    <Box sx={{ display: 'flex', gap: '0.1rem' }}>
      <IconButton
        color={colors[0] ? 'error' : 'default'}
        onClick={() => handleUpdate(0)}
      >
        <SentimentNeutralIcon />
      </IconButton>
      <IconButton
        color={colors[1] ? 'error' : 'default'}
        onClick={() => handleUpdate(1)}
      >
        <SentimentDissatisfiedIcon />
      </IconButton>
      <IconButton
        color={colors[2] ? 'error' : 'default'}
        onClick={() => handleUpdate(2)}
      >
        <SentimentVeryDissatisfiedIcon />
      </IconButton>
      <IconButton
        color={colors[3] ? 'error' : 'default'}
        onClick={() => handleUpdate(3)}
      >
        <MoodBadIcon />
      </IconButton>
      <IconButton
        color={colors[4] ? 'error' : 'default'}
        onClick={() => handleUpdate(4)}
      >
        <SickIcon />
      </IconButton>
    </Box>
  );
}
