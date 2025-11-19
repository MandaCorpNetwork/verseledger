import { alpha, Box, Typography } from "@mui/material";
import { rootRoute } from "@Routes/root";
import { createRoute } from "@tanstack/react-router";
import background from '@Assets/media/VLSandboxPic.jpg?url';
import { SandboxContent } from "@Apps/Sandbox/sandboxContent";

//This is a Sandbox Area for Testing Certain Components that may not have a home.
//Utilize SandboxContent.tsx to work on items

export const sandbox = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sandbox',
  component: () => (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1em',
        p: 5
      }}
    >
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
          mt: '1em',
          textShadow: '0 0 10px rgba(255,255,255,.5), 0 0 3px #000',
        }}
      >
        UI Sandbox Environment
      </Typography>
      <Box
        sx={{
          width: '50%',
          p: '2em',
          display: 'flex',
          flexDirection: 'column',
          borderTop: '2px solid',
          borderBottom: '2px solid',
          borderRadius: '10px',
          borderColor: 'secondary.main',
          height: '100%',
          bgcolor: 'background.paper',
          padding: '.5em',
          '&::-webkit-scrollbar': {
            width: '5px',
            height: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(0,73,130)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
            background: 'rgb(24,252,252)',
          },
        }}
      >
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
      </Box>
    </Box>
  ),
});