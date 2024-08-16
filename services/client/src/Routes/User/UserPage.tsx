import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Box } from '@mui/material';

export const UserPage: React.FC<unknown> = () => {
  return (
    <VLViewport data-testid="UserPage_PageContainer">
      <Box>UserPage</Box>
    </VLViewport>
  );
};
