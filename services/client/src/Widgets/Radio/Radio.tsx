import { Box } from '@mui/material';

import { VLWidget } from '../WidgetWrapper/WidgetWrapper';

export const WIDGET_RADIO = 'radio';

export const RadioWidget: React.FC = () => {
  return (
    <VLWidget name={WIDGET_RADIO} title="Radio">
      <Box>Radio Test</Box>
    </VLWidget>
  );
};
