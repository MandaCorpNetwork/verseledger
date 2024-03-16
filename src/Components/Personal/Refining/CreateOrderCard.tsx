import { Box, Button, Select, TextField, Typography } from '@mui/material';

export const CreateOrderCard: React.FC<unknown> = () => {
  return (
    <Box>
      <Typography>Create Work Order</Typography>
      <TextField label="Qeued" value="10 SCU" />
      <TextField label="Total SCU" value="75 SCU" />
      <Select label="Refinment Method" />
      <Typography>Material</Typography>
      <Typography>Yield</Typography>
      <Button>Add</Button>
      <TextField label="Total Cost" value="XXXX UEC" />
      <TextField label="Processing Time" value="DD XX:XX" />
      <Button>Cancel</Button>
      <Button>Confirm</Button>
    </Box>
  );
};
