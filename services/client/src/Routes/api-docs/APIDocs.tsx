import 'swagger-ui-react/swagger-ui.css';

import { Box } from '@mui/material';
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
export const APIDocs: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#FFF' }}>
      <SwaggerUI url="http://localhost:3030/api-docs/swagger.json" />
    </Box>
  );
};
