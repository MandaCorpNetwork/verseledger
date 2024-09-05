import { ArrowRight } from '@mui/icons-material';
import { Box, Collapse, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type ContractListDropdownProps = PropsWithChildren<{
  label: string;
  onExpand: () => void;
  isExpanded: boolean;
}>;

export const ContractListDropdown: React.FC<ContractListDropdownProps> = ({
  children,
  label,
  isExpanded,
  onExpand,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        onClick={onExpand}
        variant="body1"
        sx={{
          display: 'flex',
          cursor: 'pointer',
          color: isExpanded ? 'secondary.main' : 'text.secondary',
          fontWeight: 'bold',
          textShadow: '0 0 5px rgba(255,255,255,.3)',
          alignItems: 'center',
          '&:hover': {
            color: 'text.primary',
            textShadow: '0 0 5px rgba(255,255,245,.6)',
          },
        }}
      >
        {label}
        <ArrowRight
          color={isExpanded ? 'secondary' : 'inherit'}
          fontSize="large"
          sx={{
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 150ms',
          }}
        />
      </Typography>
      <Collapse in={isExpanded}>
        <Box>{children}</Box>
      </Collapse>
    </Box>
  );
};
