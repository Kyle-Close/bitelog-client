import { FeatureHighlight } from './FeatureHighlight';
import IngredientsFeatureImg from '../../assets/ingredientsFeature.png';
import CreateFoodFeatureImg from '../../assets/createFoodFeature.png';
import EatLogFeatureImg from '../../assets/eatLogFeature.png';
import EventLogFeatureImg from '../../assets/eventLogFeature.png';
import { Box, Grid } from '@mui/material';

export function Features() {
  return (
    <Box sx={{ flexGrow: 1, mt: '2rem' }}>
      <Grid
        container
        spacing={6}
        sx={{ justifyContent: { xs: 'flex-start', lg: 'center' } }}
      >
        {features.map((feature, key) => (
          <Grid
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', lg: 'center' },
              alignItems: 'center',
            }}
            key={key}
            item
            xs={8}
            lg={6}
          >
            <FeatureHighlight
              src={feature.src}
              text={feature.text}
              order={key + 1}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const features = [
  {
    src: IngredientsFeatureImg,
    text: 'Build a personalized list of ingredients to use in your food recipes',
  },
  {
    src: CreateFoodFeatureImg,
    text: 'Seamlessly create and store foods in a tailored table for integration into your dietary logs.',
  },
  {
    src: EatLogFeatureImg,
    text: 'Log your meals and easily edit, delete, and view them at a later date.',
  },
  {
    src: EventLogFeatureImg,
    text: 'Keep a log of post-meal notes to help uncover patterns.',
  },
];
