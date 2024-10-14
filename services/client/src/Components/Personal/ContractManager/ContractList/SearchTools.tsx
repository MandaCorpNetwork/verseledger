import { ArrowBackIosNew, FilterAlt } from '@mui/icons-material';
import { Badge, Box, Collapse, IconButton, Tooltip, useTheme } from '@mui/material';
import { SearchBar } from '@Utils/Filters/SearchBar';
import { SortBySelect } from '@Utils/Filters/SortBySelect';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

import { FilterList } from './FilterList';

/**
 * ### SearchTools
 * @description
 * This is the Bar displayed Above the {@link ContractList}.
 * @version 0.1.2
 * Renders the {@link FilterList}, {@link SortBySelect} & {@link SearchBar}
 * @memberof {@link ContractManagerApp}
 * @returns {JSX.Element}
 * #### Functional Components
 * @component {@link FilterList}
 * @author ThreeCrown
 */
export const SearchTools: React.FC = () => {
  // LOCAL STATES
  /**
   * State determines if the SearchTools are rendered
   * @type [boolean, React.Dispatch<React.SetStateAction<boolean>>]
   * @default {false}
   * @returns {boolean}
   */
  const [searchToolsOpen, setSearchToolsOpen] = React.useState<boolean>(false);
  /**
   * State determines if the {@link FilterList} is expanded
   * @type [boolean, React.Dispatch<React.SetStateAction<boolean>>]
   * @default {false}
   * @returns {boolean}
   */
  const [filterListOpen, setFilterListOpen] = React.useState<boolean>(false);
  /**
   * ReadOnly state of Filters from useURLQuery Hook
   */
  const { searchParams } = useURLQuery();
  // HOOKS
  const theme = useTheme();

  // LOGIC
  /**
   * Handles the clickEvent that displays the SearchTools
   */
  const toggleSearchTools = React.useCallback(() => {
    setSearchToolsOpen(!searchToolsOpen);
  }, [searchToolsOpen, setSearchToolsOpen]);

  /**
   * Handles the clickEvent that displays the {@link FilterList}
   */
  const toggleFilterList = React.useCallback(() => {
    setFilterListOpen(!filterListOpen);
  }, [filterListOpen, setFilterListOpen]);

  /**
   * Calculates the number of filters currently applied
   * @returns {number}
   */
  const getFilterCount = React.useCallback(() => {
    const subtypes = searchParams.getAll(QueryNames.Subtype);
    const bidDateBefore = searchParams.has(QueryNames.BidBefore) ? 1 : 0;
    const bidDateAfter = searchParams.has(QueryNames.BidAfter) ? 1 : 0;
    const startDateBefore = searchParams.has(QueryNames.StartBefore) ? 1 : 0;
    const startDateAfter = searchParams.has(QueryNames.StartAfter) ? 1 : 0;
    const endDateBefore = searchParams.has(QueryNames.EndBefore) ? 1 : 0;
    const endDateAfter = searchParams.has(QueryNames.EndAfter) ? 1 : 0;
    const duration = searchParams.has(QueryNames.Duration) ? 1 : 0;
    const payStructure = searchParams.has(QueryNames.PayStructure) ? 1 : 0;
    const payMin = searchParams.has(QueryNames.UECRangeMin) ? 1 : 0;
    const payMax = searchParams.has(QueryNames.UECRangeMax) ? 1 : 0;
    return (
      subtypes.length +
      bidDateBefore +
      bidDateAfter +
      startDateBefore +
      startDateAfter +
      endDateBefore +
      endDateAfter +
      duration +
      payStructure +
      payMin +
      payMax
    );
  }, [searchParams]);
  /** Calls {@link getFilterCount} */
  const filterCount = getFilterCount();

  /**
   * Checks if any values are set in search tools to render a badge dot on the searchtools expansion button
   * @returns {boolean}
   */
  const checkIsQueried = React.useCallback(() => {
    if (filterCount > 0) return true;
    return false;
  }, [filterCount]);
  /** Calls {@link checkIsQueried} */
  const isQueried = checkIsQueried();

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
    <Box
      data-testid="ContractManager-ContractList__SearchToolsContainer"
      sx={{ width: '100%', display: 'flex', flexDirection: 'row', mt: '.5em' }}
    >
      <Collapse
        data-testid="ContractManager-ContractList-SearchTools__TransformationWrapper"
        in={searchToolsOpen}
        timeout={200}
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          data-testid="ContractManager-ContractList-SearchTools__SearchToolsWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1em',
            flexGrow: 1,
            position: 'relative',
          }}
        >
          <Badge
            badgeContent={filterCount}
            color="error"
            variant="dot"
            overlap="circular"
          >
            <IconButton
              data-testid="ContractManager-ContractList-SearchTools__FiltersButton"
              onClick={toggleFilterList}
              size={theme.breakpoints.down('md') ? 'small' : 'medium'}
            >
              <FilterAlt />
            </IconButton>
          </Badge>
          <FilterList isOpen={filterListOpen} />
          <SortBySelect size="small" sortOptions={sortOptions} containerSize="small" />
          <SearchBar
            size="small"
            label="Search Contracts"
            placeholder="Title, Contractors, Ships..."
          />
        </Box>
      </Collapse>
      <Box
        data-testid="ContractManager-ContractList-SearchTools__SearchToolsExpansionWrapper"
        sx={{ display: 'flex', ml: 'auto' }}
      >
        <Badge invisible={!isQueried} color="error" variant="dot" overlap="circular">
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
