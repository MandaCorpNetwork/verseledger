// ContractMangerFiltersList.tsx
import { Paper, Popper } from '@mui/material';
import React from 'react';

import { FilterListSelection } from './FilterListSelection';

type ContractManagerFilterListProps = {
  isOpen: boolean;
  anchor: HTMLElement | null;
};

export const ContractManagerFilterList: React.FC<ContractManagerFilterListProps> = ({
  isOpen,
  anchor,
}) => {
  return (
    <Popper open={isOpen} anchorEl={anchor} placement="bottom-start">
      <Paper sx={{ p: '.5em', display: 'flex', flexDirection: 'column' }}>
        <FilterListSelection filterName="Archytype" />
        <FilterListSelection filterName="Locations" />
        <FilterListSelection filterName="Pay Range" />
      </Paper>
    </Popper>
  );
};
