import { Box, Button, Typography } from '@mui/material';

export const WorkOrderCard: React.FC<unknown> = () => {
  return (
    <Box>
      <Typography>Status</Typography>
      <Typography>Work Order Number</Typography>
      <Typography>Details</Typography>
      <Typography>Material</Typography>
      <Typography>Yield</Typography>
      <Typography>Progress</Typography>
      <Box>Progress Bar</Box>
      <Typography>Ship</Typography>
      <Typography>SCU/SCU</Typography>
      <Button>Collect</Button>
    </Box>
  )
}