import { Box, Typography } from '@mui/material';
import { VLWidget } from '@Widgets/WidgetWrapper/WidgetWrapperNew';
import React from 'react';

export const WIDGET_ROUTES = 'routes';

export const RoutesWidget: React.FC = () => {
  return (
    <VLWidget name={WIDGET_ROUTES} title="Route" data-testid="RoutesWidget">
      <Typography>TESTING</Typography>
      <Box sx={{ width: '100px', height: '100px', bgcolor: 'red' }} />
    </VLWidget>
  );
};
