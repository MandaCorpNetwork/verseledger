import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { Button } from '@mui/material';

type DesktopControllerProps = {
  onSubmit: () => void;
};

export const DesktopController: React.FC<DesktopControllerProps> = ({ onSubmit }) => {
  return (
    <ControlPanelBox
      data-testid="ContractPage-Bottom-Left__Controller_Wrapper"
      sx={{
        mb: 'auto',
        py: '.5em',
      }}
    >
      <Button color="secondary" variant="outlined" onClick={onSubmit}>
        Submit Bid
      </Button>
    </ControlPanelBox>
  );
};
