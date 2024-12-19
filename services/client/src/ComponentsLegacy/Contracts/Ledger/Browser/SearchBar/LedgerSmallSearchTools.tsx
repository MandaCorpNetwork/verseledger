import { DropdownFilter } from '@CommonLegacy/Components/App/DropdownFilter';
import { ElevatedDropdownBox } from '@CommonLegacy/Components/Collapse/ElevatedDropdownBox';
import { Divider, Typography } from '@mui/material';
import { SearchBar } from '@Utils/Filters/SearchBar';
import React from 'react';

type SmallSearchToolsProps = {
  /** Boolean Value passed to determine if the SearchTools are open */
  isOpen: boolean;
};

/**
 * A condensed Version of {@link ContractTableTools} for smaller viewports
 */
export const SmallSearchTools: React.FC<SmallSearchToolsProps> = ({ isOpen }) => {
  // LOCAL STATES
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const handleExpand = React.useCallback((panel: string) => {
    setExpanded((prevExpanded) => (prevExpanded === panel ? null : panel));
  }, []);
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
      <div
        data-testid="ContractLedger-SmallSearchTools__SortandSearchWrapper"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: '1em',
        }}
      >
        <SearchBar
          size="small"
          label="Search Contracts"
          placeholder="Title, Contractors, Ships..."
        />
      </div>
      <Divider
        data-testid="ContractLedger-SmallSearchTools__Divider"
        sx={{ width: '60%', mx: 'auto' }}
      />
      <Typography
        data-testid="ContractLedger-SmallSearchTools__FilterHeader"
        align="center"
        variant="h6"
        sx={{
          mt: '.5em',
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
