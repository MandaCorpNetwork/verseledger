import { Box, Divider, Typography } from '@mui/material';

export const OverviewTool: React.FC<unknown> = () => {
  return (
    <Box sx={{}}>
      <Typography variant="h2">Overview</Typography>
      <Divider />
      <Box sx={{}}>
        <Typography variant="h4">Notifications</Typography>
        <Divider />
      </Box>
      <Box>
        <Typography variant="h4">Location Explorer</Typography>
        <Divider />
      </Box>
      <Box>
        <Typography variant="h4">Radio Frequencies</Typography>
        <Divider />
      </Box>
      <Box>
        <Typography variant="h4">Ship Status</Typography>
        <Divider />
      </Box>
      <Box>
        <Typography variant="h4">Active Tools</Typography>
        <Divider />
      </Box>
    </Box>
  );
};
