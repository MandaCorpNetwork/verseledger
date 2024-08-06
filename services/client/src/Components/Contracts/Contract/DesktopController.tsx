import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { Button } from '@mui/material';

type DesktopControllerProps = {
  onSubmit: () => void;
};

export const DesktopController: React.FC<DesktopControllerProps> = ({ onSubmit }) => {
  return (
    <ControlPanelBox>
      <Button color="secondary" variant="outlined" onClick={onSubmit}>
        Submit Bid
      </Button>
    </ControlPanelBox>
  );
};
