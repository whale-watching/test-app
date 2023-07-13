import { Box, Grid, LinearProgress } from '@mui/material';

export const CheckingAuth = () => {
  return (
    <Grid container alignItems='center' justifyContent='center' sx={{ minHeight: '100vh', backgroundColor: 'primary.main' }}>
      <Box sx={{ width: '25%' }}>
        <LinearProgress color='error' />
      </Box>
    </Grid>
  );
};
