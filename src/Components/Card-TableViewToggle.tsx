import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { RecentActors, TableChart } from '@mui/icons-material';

export const CardorTableViewToggle: React.FC<unknown> = () => {
  return (
    <ToggleButtonGroup exclusive size='small'>
      <ToggleButton value="{ContractCardView}">
        <RecentActors />
      </ToggleButton>
      <ToggleButton value="{ContractTableView}">
        <TableChart />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
