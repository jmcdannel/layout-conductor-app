import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function ApiError() {
  
  return (
    <Container maxWidth="lg">
    <Grid container spacing={1}>
      <Box p={2}>
        <h1>Error: could not load turnouts. Check settings and make sure the API host is running.</h1>
      </Box>
    </Grid>
  </Container>
  );

}

export default ApiError;