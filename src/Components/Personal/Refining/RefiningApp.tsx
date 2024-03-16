import { Box, Button, Select, Typography } from '@mui/material';

import { LocationSelection } from '@/Common/LocationSelection';
import { WorkOrderCard } from '@/Components/Personal/Refining/WorkOrderCard';
import { CreateOrderCard } from '@/Components/Personal/Refining/CreateOrderCard';

export const RefiningApp: React.FC<unknown> = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '10%',
          alignItems: 'center',
        }}
      >
        <LocationSelection />
        <Select label="Ship Select" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '90%' }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', width: '15%', height: '100%' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '45%' }}>
            <Typography>Location</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography>Material</Typography>
              <Typography>Yield</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '45%' }}>
            <Typography>Selected Ship</Typography>
            <Box>SCU Usage</Box>
            <Box>
              <Button>Create Order</Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CreateOrderCard />
            <WorkOrderCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
