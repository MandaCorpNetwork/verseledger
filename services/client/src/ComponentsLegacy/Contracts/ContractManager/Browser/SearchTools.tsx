import { FilterButton } from '@Common/Components/Extended/Buttons/FilterButton';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Badge, Box, Collapse, IconButton, Tooltip, useTheme } from '@mui/material';
import { SearchBar } from '@Utils/Filters/SearchBar';
import { SortBySelect } from '@Utils/Filters/SortBySelect';
import { useFilterUtils } from '@Utils/Hooks/useFilterUtils';
import React from 'react';

import { FilterList } from './FilterList';

/**
 * ## SearchTools
 * Renders the {@link FilterList}, {@link SortBySelect} & {@link SearchBar}
 */
export const SearchTools: React.FC = () => {
  // LOCAL STATES
  /** State determines if the SearchTools are rendered */
  const [searchToolsOpen, setSearchToolsOpen] = React.useState<boolean>(false);
  /** State determines if the {@link FilterList} is expanded */
  const [filterListOpen, setFilterListOpen] = React.useState<boolean>(false);
  // HOOKS
  const theme = useTheme();
  const filterUtils = useFilterUtils();

  // LOGIC
  /** Handles the clickEvent that displays the SearchTools */
  const toggleSearchTools = React.useCallback(() => {
    setSearchToolsOpen(!searchToolsOpen);
  }, [searchToolsOpen, setSearchToolsOpen]);

  /** Handles the clickEvent that displays the {@link FilterList} */
  const toggleFilterList = React.useCallback(() => {
    setFilterListOpen(!filterListOpen);
  }, [filterListOpen, setFilterListOpen]);

  /** Uses filterCount Function from FilterUtils */
  const filterCount = filterUtils.filterCount();

  /** Renders Badge Dot on Expand Button when true */
  const isFiltered = filterCount > 0;

  //TODO: Build Sorting Functionality for the App
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

  /** Disables the MuiCollapse if Animation Settings are Low or None */
  const disableCollapse =
    theme.animations === 'low' || theme.animations === 'none' ? true : searchToolsOpen;

  return (
    <Box
      component="search"
      aria-label="Search Tools Dropdown"
      id="SearchToolsContainer"
      data-testid="ContractManager-ContractList__SearchToolsContainer"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        mt: '.5em',
        position: 'relative',
        minHeight: '40px',
      }}
    >
      <Collapse
        data-testid="ContractManager-ContractList-SearchTools__TransformationWrapper"
        in={disableCollapse}
        timeout={theme.transitions.duration.shorter}
        unmountOnExit
        mountOnEnter
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          data-testid="ContractManager-ContractList-SearchTools__SearchToolsWrapper"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: '1em',
            flexGrow: 1,
            position: 'relative',
          }}
        >
          <FilterButton onClick={toggleFilterList} />
          <FilterList
            data-testid="ContractManager-ContractList-SearchTools__FiltersButton"
            isOpen={filterListOpen}
          />
          <SortBySelect size="small" sortOptions={sortOptions} containerSize="small" />
          <SearchBar
            size="small"
            label="Search Contracts"
            placeholder="Title, Contractors, Ships..."
          />
        </div>
      </Collapse>
      <Box
        data-testid="ContractManager-ContractList-SearchTools__SearchToolsExpansionWrapper"
        sx={{ display: 'flex', ml: 'auto' }}
      >
        <Badge invisible={!isFiltered} color="error" variant="dot" overlap="circular">
          <Tooltip arrow title="Search Tools">
            <IconButton
              data-testid="ContractManager-ContractList-SearchTools__SearchToolsExpansionButton"
              onClick={toggleSearchTools}
              size={theme.breakpoints.down('md') ? 'small' : 'medium'}
              sx={{
                transform: !searchToolsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 200ms',
              }}
            >
              <ArrowBackIosNew
                fontSize={theme.breakpoints.down('md') ? 'small' : 'medium'}
              />
            </IconButton>
          </Tooltip>
        </Badge>
      </Box>
    </Box>
  );
};
