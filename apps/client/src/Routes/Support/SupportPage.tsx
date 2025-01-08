import VLLogo from '@Assets/media/VLLogo_LargeSquare.png';
import { Box } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router';

import { SupportDisplay } from '@/wiki/SupportDisplay';
import { SupportDrawer } from '@/wiki/SupportDrawer';

export const SupportPage: React.FC = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!page) {
      navigate('/support/about');
    }
  }, [navigate, page]);
  return (
    <Box
      data-testid="WikiPage__Container"
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        py: '1em',
        '&:before': {
          content: '""',
          position: 'absolute',
          backgroundImage: `url(${VLLogo})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: -1,
        },
      }}
    >
      <SupportDrawer />
      <SupportDisplay />
    </Box>
  );
};
