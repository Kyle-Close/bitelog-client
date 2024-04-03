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
      <Grid item xs={6}>
        <Typography
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' },
          }}
          fontWeight='bold'
        >
          {name}
        </Typography>
      </Grid>
      <Grid item xs={6}>
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
