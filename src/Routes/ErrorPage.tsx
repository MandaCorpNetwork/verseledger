import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as { error: Error } & Error;
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: '100vh' }}
      sx={{ marginTop: '3em' }}
    >
      <Grid item>
        <Typography variant="h1">Oops!</Typography>
        <Typography>Sorry, an error has occured.</Typography>
        <Typography variant="subtitle1">
          {error?.error?.message ?? error?.message ?? 'Something went Wrong'}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default ErrorPage;
