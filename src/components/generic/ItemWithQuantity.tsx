import { Grid, Typography } from '@mui/material';
import QuantityInput from './QuantityInput';

interface ItemWithQuantityProps {
  name: string;
  quantity: number;
  handleChange: (newQuantity: number) => void;
}

function ItemWithQuantity({
  name,
  quantity,
  handleChange,
}: ItemWithQuantityProps) {
  return (
    <Grid alignItems='center' container spacing={2}>
      <Grid item xs={4} md={6}>
        <Typography
          sx={{
            fontSize: {
              xs: '0.8rem',
              sm: '0.9rem',
              md: '0.95rem',
              lg: '1rem',
            },
          }}
          fontWeight='bold'
        >
          {name}
        </Typography>
      </Grid>
      <Grid item xs={8} md={6}>
        <QuantityInput
          min={1}
          max={99}
          value={quantity}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  );
}

export default ItemWithQuantity;
