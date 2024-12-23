import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import type React from 'react';

type DataDisplayToggleProps = {
  pageKey: string;
};

export const DataDisplayToggle: React.FC<DataDisplayToggleProps> = () => {
  return (
    <ToggleButtonGroup exclusive>
      <ToggleButton value={0}>Card</ToggleButton>
      <ToggleButton value={1}>Table</ToggleButton>
    </ToggleButtonGroup>
  );
};
