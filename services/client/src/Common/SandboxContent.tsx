import { Box } from '@mui/material';

import { ListSelectButton } from './Components/Styled/Buttons/IndicatorButton';

export const SandboxContent: React.FC<unknown> = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '1em',
      }}
    >
      <Box sx={{ display: 'flex', gap: '1em', flexDirection: 'column' }}>
        <ListSelectButton>Pick Me</ListSelectButton>
      </Box>
    </Box>
  );
};
