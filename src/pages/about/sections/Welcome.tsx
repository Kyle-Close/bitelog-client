import { Typography } from '@mui/material';
import { AboutSection } from '.';

export function Welcome() {
  return (
    <AboutSection heading='Welcome to Bitelog!'>
      <Typography fontSize='inherit'>
        At Bitelog, we believe that food is more than just nourishment; it's a
        journey of flavors, experiences, and, most importantly, personal
        well-being. Our mission is to empower you to discover the unique
        relationship between your diet and your health, one bite at a time.
      </Typography>
    </AboutSection>
  );
}
