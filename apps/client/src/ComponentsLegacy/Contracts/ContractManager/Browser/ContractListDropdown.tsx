import '@Assets/Css/ripple.css';

import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { ArrowRight, ErrorTwoTone } from '@mui/icons-material';
import {
  Badge,
  Box,
  ButtonBase,
  Collapse,
  IconButton,
  SvgIcon,
  Typography,
} from '@mui/material';
import type { PropsWithChildren } from 'react';
import React from 'react';

type ContractListDropdownProps = PropsWithChildren<{
  /** Function to trigger on Expand */
  onExpand: () => void;
  /** Boolean Value to evaluate if the dropdown is open or not */
  isExpanded: boolean;
  /** Which archetype Label to display and find the icon */
  archetype: string;
  /** The Total numbers of contracts to be displayed */
  count: number;
}>;

/**
 * ### Contract List Dropdown
 * @description
 * A Dropdown box to contain contract items in a collapse with a button that triggers the collapses rendering. Sorts contracts by Contract Archetypes within the Contract List
 * @memberof {@link ContractList}
 */
export const ContractListDropdown: React.FC<ContractListDropdownProps> = ({
  children,
  isExpanded,
  onExpand,
  archetype,
  count,
}) => {
  // LOGIC

  /** Decide the text Color to render depending on expansion of collapse */
  const selectedColor = isExpanded ? 'secondary.main' : 'text.secondary';

  /** Fetch the currently selected Archetype Object to render the Icon */
  const archetypeObj = contractArchetypes.find(
    (option) => option.archetype === archetype,
  );

  const ArchetypeIcon = archetypeObj?.archetypeIcon ?? ErrorTwoTone;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <ButtonBase
        onClick={onExpand}
        TouchRippleProps={{ className: 'dark-ripple' }}
        sx={{
          opacity: 1,
          p: '1em',
          width: '90%',
          flexDirection: 'row',
          borderRadius: '10px',
          border: '2px solid',
          borderColor: 'primary.light',
          background: 'linear-gradient(135deg, rgba(8,22,80,.6), rgba(0,33,100,.6))',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            cursor: 'pointer',
            color: selectedColor,
            fontWeight: 'bold',
            textShadow: '0 0 5px rgba(0,0,0,.5)',
            alignItems: 'center',
            letterSpacing: '1.5px',
            gap: '.5em',
            '&:hover': {
              color: 'text.primary',
              textShadow: '0 0 5px rgba(255,255,245,.6)',
            },
          }}
        >
          <SvgIcon component={ArchetypeIcon} color="secondary" fontSize="medium" />
          {archetype === 'RRR' ? 'Rearm Refuel Repair' : archetype}
        </Typography>
        <Badge
          badgeContent={count}
          sx={{
            ml: 'auto',
            '& .MuiBadge-badge': {
              bgcolor: 'grey',
              color: isExpanded ? 'secondary.main' : 'text.primary',
            },
          }}
        />
        <IconButton>
          <ArrowRight
            fontSize="large"
            sx={{
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 150ms',
              color: selectedColor,
            }}
          />
        </IconButton>
      </ButtonBase>
      <Collapse in={isExpanded}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            px: '1em',
            gap: '.5em',
            py: '.5em',
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};
