import { Box, Button, Select, TextField, Typography } from '@mui/material';

export const CreateOrderCard: React.FC<unknown> = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{}}>
        <Typography>Create Work Order</Typography>
      </Box>
      <Box>
        <TextField label="Qeued" value="10 SCU" sx={{ width: '8em' }} />
        <TextField label="Total SCU" value="75 SCU" sx={{ width: '8em' }} />
      </Box>
      <Box>
        <Select label="Refinment Method" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography>Material</Typography>
        <Typography>Yield</Typography>
      </Box>
      <Box>
        <Button>Add</Button>
      </Box>
      <Box>
        <TextField label="Total Cost" value="XXXX UEC" />
        <TextField label="Processing Time" value="DD XX:XX" />
      </Box>
      <Box>
        <Button>Cancel</Button>
        <Button>Confirm</Button>
      </Box>
    </Box>
  );
};
