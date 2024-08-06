import { Box, Button } from '@mui/material';

type MorTController = {
  onSubmit: () => void;
};

export const MobileOrTabletController: React.FC<MorTController> = ({ onSubmit }) => {
  return (
    <Box data-testid="ContractPage__ContractController_Small_Wrapper">
      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        onClick={onSubmit}
      >
        Submit Bid
      </Button>
    </Box>
  );
};
