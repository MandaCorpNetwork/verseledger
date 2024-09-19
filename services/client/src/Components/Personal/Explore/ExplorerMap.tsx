import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Box, Typography } from '@mui/material';

export const ExploreMap: React.FC = () => {
  return (
    <GlassDisplay
      data-testid="ExploreApp-Explorer__Map_Container"
      sx={{
        display: 'flex',
        minHeight: '80%',
        width: '100%',
        p: '1em',
      }}
    >
      <Box
        data-testid="ExploreApp-Explorer-Map__Wrapper"
        sx={{
          display: 'flex',
          background: 'linear-gradient(135deg, rgba(0,0,0,.3), rgba(0,1,19,.5))',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          border: '2px solid',
          borderColor: 'rgba(33,150,243,.4)',
          boxShadow: '0 6px 12px rgba(0,0,0,.8)',
          '&:hover': {
            borderColor: 'primary.light',
          },
        }}
      >
        <Typography
          data-testid="ExploreApp-Explorer-Map__Title"
          variant="h6"
          color="warning"
          sx={{ letterSpacing: '2px', textShadow: '0 2px 4px rgb(0,0,0)' }}
        >
          Map In Construction
        </Typography>
      </Box>
    </GlassDisplay>
  );
};
