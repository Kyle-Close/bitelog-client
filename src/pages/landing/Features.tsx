import { FeatureHighlight } from './FeatureHighlight';
import IngredientsFeatureImg from '../../assets/ingredientsFeature.png';
import CreateFoodFeatureImg from '../../assets/createFoodFeature.png';
import EatLogFeatureImg from '../../assets/eatLogFeature.png';
import EventLogFeatureImg from '../../assets/eventLogFeature.png';
import { Box } from '@mui/material';

export function Features() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {features.map((feature, key) => (
        <FeatureHighlight key={key} src={feature.src} text={feature.text} />
      ))}
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
