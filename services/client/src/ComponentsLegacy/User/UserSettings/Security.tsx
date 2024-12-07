import GlassBox from '@CommonLegacy/Components/Boxes/GlassBox';
import { Grow, Typography } from '@mui/material';

export const SecuritySettings: React.FC = () => {
  return (
    <Grow in={true} timeout={{ enter: 500, exit: 500 }}>
      <GlassBox sx={{ minHeight: '100%', minWidth: '100%' }}>
        <Typography>Security Settings</Typography>
      </GlassBox>
    </Grow>
  );
};
