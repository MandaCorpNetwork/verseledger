import { DropdownFilter } from '@Common/Components/App/DropdownFilter';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { ElevatedDropdownBox } from '@Common/Components/Collapse/ElevatedDropdownBox';
import { EmergencySwitch } from '@Common/Components/Switch/EmergencySwitch';
import { FilterAlt } from '@mui/icons-material';
import { Badge, Box, Button, Typography } from '@mui/material';
import { SearchBar } from '@Utils/Filters/SearchBar';
import { SortBySelect } from '@Utils/Filters/SortBySelect';
import { QueryNames } from '@Utils/QueryNames';
import React, { useRef, useState } from 'react';

import { useSoundEffect } from '@/AudioManager';
import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

/**
 * ### ContractTableTools
 * @description
 * This component is a container for the tools used to filter and sort the contract list in the {@link ContractBrowser}
 * @version 0.1.4
 * @returns {JSX.Element}
 * #### Functional Components
 * @component {@link EmergencySwitch}
 * @component {@link DropdownFilter}
 * @component {@link SearchBar}
 * @component {@link SortBySelect}
 * #### Styled Components
 * @component {@link DigiBox}
 * @component {@link ElevatedDropdownBox}
 * @author ThreeCrown
 */
export const ContractTableTools: React.FC<unknown> = () => {
  // LOCAL STATES
  /** State using the useURLQuery hook to store & read the URL query parameters */
  const [filters, setFilter] = useURLQuery();
  /**
   * State determines if the FilterList Collapse is expanded
   * @type [boolean, React.Dispatch<React.SetStateAction<boolean>>]
   * @default {false}
   * @returns {boolean}
   */
  const [open, setOpen] = useState(false);
  /**
   * State determins which Dropdown Filer is currently open.
   * @const
   * @type [string | null, React.Dispatch<React.SetStateAction<string | null>]
   * @default {null}
   * @returns {string} - The current expanded filter.
   */
  const [expanded, setExpanded] = useState<string | null>(null);
  // HOOKS
  const toolsRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSoundEffect();
  // LOGIC
  /** Handles the clickEvent that toggles the FilterList */
  const handleClick = () => {
    playSound('clickMain');
    setOpen((prevOpen) => !prevOpen);
  };
  /**
   * @function handleExpand - Handles the clickEvent that expands a `DropdownFilter` component.
   * @params {string} panel - The name of the filter to expand.
   */
  const handleExpand = React.useCallback((panel: string) => {
    setExpanded((prevExpanded) => (prevExpanded === panel ? null : panel));
  }, []);
  /**
   * @function getFilterCount - Returns the number of filters currently applied.
   * @returns {number} - The number of filters currently applied.
   */
  const getFilterCount = React.useCallback(() => {
    const subtypes = filters.getAll(QueryNames.Subtype);
    const bidDateBefore = filters.has(QueryNames.BidBefore) ? 1 : 0;
    const bidDateAfter = filters.has(QueryNames.BidAfter) ? 1 : 0;
    const startDateBefore = filters.has(QueryNames.StartBefore) ? 1 : 0;
    const startDateAfter = filters.has(QueryNames.StartAfter) ? 1 : 0;
    const endDateBefore = filters.has(QueryNames.EndBefore) ? 1 : 0;
    const endDateAfter = filters.has(QueryNames.EndAfter) ? 1 : 0;
    const duration = filters.has(QueryNames.Duration) ? 1 : 0;
    const contractorRating = filters.has(QueryNames.ContractorRating) ? 1 : 0;
    const payStructure = filters.has(QueryNames.PayStructure) ? 1 : 0;
    const payMin = filters.has(QueryNames.UECRangeMin) ? 1 : 0;
    const payMax = filters.has(QueryNames.UECRangeMax) ? 1 : 0;
    return (
      subtypes.length +
      bidDateBefore +
      bidDateAfter +
      startDateBefore +
      startDateAfter +
      endDateBefore +
      endDateAfter +
      duration +
      contractorRating +
      payStructure +
      payMin +
      payMax
    );
  }, [filters]);
  /** Calls {@link getFilterCount} */
  const filterCount = getFilterCount();
  /**
   * @function emergencyMode - Checks if the emergency mode is enabled and true in the URL query parameters
   * @returns {boolean} - True if the emergency mode is enabled and true in the URL query parameters, false otherwise.
   */
  const emergencyMode = React.useMemo(() => {
    return filters.get(QueryNames.Emergency) === 'true';
  }, [filters]);
  /**
   * @function handleEmergencyMode - Handles the clickEvent that toggles the emergency mode
   * @fires setFilter()
   * - Sets the emergency mode to true in the URL query parameters if the query does not exist
   * - Removes the emergency mode from the URL query parameters if the query exists
   */
  const handleEmergencyMode = React.useCallback(() => {
    if (emergencyMode) {
      setFilter(QueryNames.Emergency, []);
    } else {
      setFilter(QueryNames.Emergency, 'true');
    }
  }, [emergencyMode, setFilter]);

  const sortOptions = [
    {
      label: 'Rating',
      value: 'rating',
    },
    {
      label: 'Pay',
      value: 'pay',
    },
    {
      label: 'Contract Title',
      value: 'title',
    },
    {
      label: 'Bid Status',
      value: 'bidStatus',
    },
    {
      label: 'Location',
      value: 'location',
    },
    {
      label: 'Time Remaining',
      value: 'timeRemain',
    },
  ];

  return (
    <DigiBox
      data-testid="ContractLedger-ColumnTwo__TableToolsContainer"
      ref={toolsRef}
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'relative',
        py: '.5em',
      }}
    >
      <Box data-testid="ContractLedger-ColumnTwo__FiltersContainer">
        <EmergencySwitch
          data-testid="ContractLedger_EmergencyToggle"
          isEmergency={emergencyMode}
          onToggle={handleEmergencyMode}
        />
        <Badge
          data-testid="ContractLedger-TableTools__FilterBadge"
          badgeContent={filterCount}
          color="error"
          variant="standard"
          overlap="rectangular"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            opacity: open ? 1 : 0.8,
          }}
        >
          <Button
            data-testid="ContractLedger-TableTools__FilterButton"
            onClick={handleClick}
            color="secondary"
            variant="outlined"
            startIcon={<FilterAlt />}
            size="small"
            sx={{
              ml: '2em',
              '&:hover': {
                boxShadow: '0 0px 10px',
              },
            }}
          >
            Filters
          </Button>
        </Badge>
      </Box>
      <ElevatedDropdownBox
        data-testid="ContractLedger-TableTools__FilterDrawer"
        key="Contract-Table-Filter-Drawer"
        in={open}
        sx={{
          p: '1em',
        }}
      >
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
      <Typography
        data-testid="ContractLedger-TableTools__Title"
        variant="h5"
        sx={{ color: 'text.secondary', textShadow: '1px 1px 2px rgba(0,73,130,0.8)' }}
      >
        Contract Browser
      </Typography>
      <Box
        data-testid="ContractLedger-TableTools__SortandSearchWrapper"
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <Box
          data-testid="ContractLedger-TableTools-SortandSearch__SortByWrapper"
          sx={{ marginRight: '1em' }}
        >
          <SortBySelect size="small" sortOptions={sortOptions} containerSize="small" />
        </Box>
        <Box data-testid="ContractLedger-TableTools-SortandSearch__SearchWrapper">
          <SearchBar
            size="small"
            label="Search Contracts"
            placeholder="Title, Contractors, Ships..."
          />
        </Box>
      </Box>
    </DigiBox>
  );
};
