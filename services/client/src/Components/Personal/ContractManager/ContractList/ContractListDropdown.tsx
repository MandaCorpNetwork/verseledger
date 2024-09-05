import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { ArrowRight } from '@mui/icons-material';
import { Badge, Box, ButtonBase, Collapse, IconButton, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type ContractListDropdownProps = PropsWithChildren<{
  onExpand: () => void;
  isExpanded: boolean;
  archetype: string;
}>;

export const ContractListDropdown: React.FC<ContractListDropdownProps> = ({
  children,
  isExpanded,
  onExpand,
  archetype,
}) => {
  const archetypeObj = contractArchetypes('text.secondary', 'large').find(
    (option) => option.archetype === archetype,
  );
  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <ButtonBase
        sx={{
          opacity: 1,
          p: '1.5em',
          width: '90%',
          flexDirection: 'row',
        }}
      >
        <Typography
          onClick={onExpand}
          variant="h5"
          sx={{
            display: 'flex',
            cursor: 'pointer',
            color: isExpanded ? 'secondary.main' : 'text.secondary',
            fontWeight: 'bold',
            textShadow: '0 0 5px rgba(255,255,255,.3)',
            alignItems: 'center',
            gap: '1em',
            '&:hover': {
              color: 'text.primary',
              textShadow: '0 0 5px rgba(255,255,245,.6)',
            },
          }}
        >
          {archetypeObj?.archetypeIcon}
          {archetype}
        </Typography>
        <Badge color="primary" />
        <IconButton
          sx={{
            ml: 'auto',
          }}
        >
          <ArrowRight
            color={isExpanded ? 'secondary' : 'inherit'}
            fontSize="large"
            sx={{
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 150ms',
            }}
          />
        </IconButton>
      </ButtonBase>

      <Collapse in={isExpanded}>
        <Box>{children}</Box>
      </Collapse>
    </Box>
  );
};
