import { List, Typography } from '@mui/material';
import { AboutSection } from '.';
import ListItem from '@mui/material/ListItem';

export function HowItWorks() {
  return (
    <AboutSection heading='How it Works'>
      <Typography fontSize='inherit'>
        Our platform is intuitively designed to allow you to:
      </Typography>
      <List>
        <ListItemWrapper
          title='Create a Personalized Ingredient Library'
          text='Start by cataloging the ingredients that make up your meals. This becomes the foundation of your food journal, enabling precise tracking and insights.'
        />
        <ListItemWrapper
          title='Build Your Food Diary'
          text='Combine ingredients to form foods and log them into your journal with timestamps. Note the quantities to keep an accurate record of your consumption.'
        />
        <ListItemWrapper
          title='Monitor Reactions and Events'
          text='After your meals, log any physical reactions or events with a timestamp, note, and an optional discomfort level. This feature is crucial for identifying patterns and triggers, helping you make informed decisions about your diet.'
        />
        <ListItemWrapper
          title='Reflect and Adjust'
          text={`Over time, your journal will provide valuable insights into how your diet affects your well-being, empowering you to make adjustments tailored to your body's needs.`}
        />
      </List>
    </AboutSection>
  );
}

interface ListItemProps {
  title: string;
  text: string;
}

function ListItemWrapper({ title, text }: ListItemProps) {
  return (
    <ListItem>
      <Typography color='secondary' fontWeight={500} fontSize='inherit'>
        {title}:{' '}
        <Typography
          component='span'
          color={'#fff'}
          fontWeight={400}
          fontSize='inherit'
        >
          {text}
        </Typography>
      </Typography>
    </ListItem>
  );
}
