import { Box, Collapse, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type ContractListDropdownProps = PropsWithChildren<{
  label: 'string';
}>;

export const ContractListDropdown: React.FC<ContractListDropdownProps> = (props) => {
  const { children, label } = props;
  return (
    <Box>
      <Typography></Typography>
      <Collapse>
        <Box>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};
