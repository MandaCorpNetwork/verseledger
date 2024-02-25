import { RecentActors, TableChart } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export const CardorTableViewToggle: React.FC<unknown> = () => {
  return (
    <ToggleButtonGroup exclusive size="small">
      <ToggleButton value="{ContractCardView}">
        <RecentActors />
      </ToggleButton>
      <ToggleButton value="{ContractTableView}">
        <TableChart />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
