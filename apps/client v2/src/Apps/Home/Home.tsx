import { BackdropVideo } from '@Common/Components/Core/Media/BackdropVideo';
import { Box } from '@mui/material';

export const Home: React.FC<unknown> = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        position: 'relative',
      }}
      data-testid="Home__"
      aria-label=""
      role=""
    >
      <BackdropVideo />
    </Box>
  );
};
