import { DropdownFilter } from '@Common/Components/App/DropdownFilter';
import { ElevatedDropdownBox } from '@Common/Components/Collapse/ElevatedDropdownBox';
import { Box, Divider, Typography } from '@mui/material';
import { SearchBar } from '@Utils/Filters/SearchBar';
import { SortBySelect } from '@Utils/Filters/SortBySelect';
import React from 'react';

type SmallSearchToolsProps = {
  /** Boolean Value passed to determine if the SearchTools are open */
  isOpen: boolean;
};

/**
 * @component
 * A condensed Version of {@link ContractTableTools} for smaller viewports
 * @memberof {@link ContractLedgerPage}
 * @param {boolean} isOpen - Boolean Value passed to determine if the SearchTools are open
 * @returns {JSX.Element}
 * @author ThreeCrown
 */
export const SmallSearchTools: React.FC<SmallSearchToolsProps> = ({ isOpen }) => {
  // LOCAL STATES
  /**
   * State determins if a {@link DropdownFilter} is rendered
   * @type [string | null, React.Dispatch<React.SetStateAction<string | null>>]
   * @default {null}
   * @returns {string}
   */
  const [expanded, setExpanded] = React.useState<string | null>(null);
  // LOGIC
  /**
   * Handles the clickEvent that displays a {@link DropdownFilter}
   * @param {string} panel - The name of the {@link DropdownFilter} to be displayed
   * @returns {void}
   * @fires setExpanded - Sets the {@link DropdownFilter} to be displayed
   */
  const handleExpand = React.useCallback((panel: string) => {
    setExpanded((prevExpanded) => (prevExpanded === panel ? null : panel));
  }, []);
  const sortOptions = [
    {
      label: 'Pay',
      value: 'pay',
    },
    {
      label: 'Title',
      value: 'title',
    },
    {
      label: 'Status',
      value: 'status',
    },
    {
      label: 'Location',
      value: 'location',
    },
    {
      label: 'Time Left',
      value: 'timeleft',
    },
  ];
  return (
    <ElevatedDropdownBox
      data-testid="ContractLedger-SmallSearchTools__Collapse"
      in={isOpen}
      sx={{
        width: '60%',
        position: 'absolute',
        height: 'auto',
        zIndex: 100,
        top: 5,
        left: '50%',
        transform: 'translateX(-50%)',
        p: '1em',
      }}
    >
      <Box
        data-testid="ContractLedger-SmallSearchTools__SortandSearchWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          mb: '1em',
        }}
      >
        <SortBySelect size="small" sortOptions={sortOptions} containerSize="small" />
        <SearchBar
          size="small"
          label="Search Contracts"
          placeholder="Title, Contractors, Ships..."
        />
      </Box>
      <Divider
        data-testid="ContractLedger-SmallSearchTools__Divider"
        sx={{ width: '60%', mx: 'auto' }}
      />
      <Typography
        data-testid="ContractLedger-SmallSearchTools__FilterHeader"
        align="center"
        variant="h6"
        sx={{
          my: '.5em',
          textShadow: '0 0 5px rgba(14,252,252,.5), 0 0 2px rgba(0,1,19)',
        }}
      >
        Filters
      </Typography>
      <DropdownFilter
        filter="Subtype"
        label="SubTypes"
        isExpanded={expanded === 'Subtype'}
        onExpand={() => handleExpand('Subtype')}
      />
      <DropdownFilter
        filter="Locations"
        label="Locations"
        isExpanded={expanded === 'Locations'}
        onExpand={() => handleExpand('Locations')}
      />
      <DropdownFilter
        filter="Scheduling"
        label="Scheduling"
        isExpanded={expanded === 'Scheduling'}
        onExpand={() => handleExpand('Scheduling')}
      />
      <DropdownFilter
        filter="Ratings"
        label="Ratings"
        isExpanded={expanded === 'Ratings'}
        onExpand={() => handleExpand('Ratings')}
      />
      <DropdownFilter
        filter="Pay"
        label="Compensation"
        isExpanded={expanded === 'Pay'}
        onExpand={() => handleExpand('Pay')}
      />
    </ElevatedDropdownBox>
  );
};
