import { Typography } from '@mui/material';
import { AboutSection } from '.';

export function Story() {
  return (
    <AboutSection heading='Our Story'>
      <Typography fontSize='inherit'>
        Inspired by the quest for understanding how different foods interact
        with our bodies, Bitelog was born out of the need for a simple, yet
        profound tool to track, analyze, and reflect on our dietary habits.
        Whether you're navigating food sensitivities, embarking on a new diet,
        or simply aiming to maintain a balanced lifestyle, our platform is
        designed to be your companion in this journey towards optimal health.
      </Typography>
    </AboutSection>
  );
}
