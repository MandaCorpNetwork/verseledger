import background from '@Assets/media/VLSandboxPic.jpg?url';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Box, Typography } from '@mui/material';

import { SandboxContent } from './SandboxContent';

//This is a Sandbox Area for Testing Certain Components that may not have a home.
//Utilize SandboxContent.tsx to work on items

export const Sandbox = () => {
  return (
    <VLViewport>
      <Box
        sx={{
          position: 'absolute',
          backgroundImage: `url(${background})`,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
          opacity: 0.7,
          backdropFilter: 'blur(20px)',
        }}
      />
      <Typography
        variant="h4"
        sx={{
          color: 'primary.light',
          fontWeight: 'bold',
          letterSpacing: '2px',
          textAlign: 'center',
          my: '1em',
          textShadow: '0 0 10px rgba(255,255,255,.5), 0 0 3px #000',
        }}
      >
        UI Sandbox Environment
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          my: '10%',
        }}
      >
        <GlassBox sx={{ width: '50%', p: '2em' }}>
          <Typography
            variant="h6"
            sx={{
              color: 'secondary.light',
              fontWeight: 'bold',
              letterSpacing: '2px',
              textAlign: 'center',
              textShadow: '0 0 10px rgba(255,255,255,.5), 0 0 3px #000',
              mb: 'auto',
            }}
          >
            Test Environment
          </Typography>
          <SandboxContent />
        </GlassBox>
      </Box>
    </VLViewport>
  );
};
