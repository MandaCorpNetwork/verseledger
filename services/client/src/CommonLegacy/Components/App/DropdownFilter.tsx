//CLFilterDropdown is a reusable DropDown for displaying filters in the Contract Ledger Table Tools Component.
import { useSoundEffect } from '@Audio/AudioManager';
import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import PopupFormDisplay from '@CommonLegacy/Components/Boxes/PopupFormDisplay';
import { ClearAllButton } from '@CommonLegacy/Components/Buttons/ClearAllButton';
import { ArrowRight } from '@mui/icons-material';
import { Badge, Box, Chip, Collapse, Typography } from '@mui/material';
import { LocationsFilter } from '@Utils/Filters/LocationsFilter';
import { RatingsFilter } from '@Utils/Filters/RatingsFilter';
import { SchedulingDropdownFilter } from '@Utils/Filters/ScheduleFilter';
import { SubTypeFilter } from '@Utils/Filters/SubtypeFilter';
import { UECFilter } from '@Utils/Filters/UECFilter';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Utils/QueryNames';
import React, { useCallback } from 'react';

type DropdownFilterProps = {
  /** The Filter to be rendered. */
  filter: IFilters;
  /** The label displayed above the collapse. */
  label: string;
  /** Determines if the filter is currently expanded. */
  isExpanded: boolean;
  /** The function to be called when the filter is expanded. */
  onExpand: () => void;
};

/**
 * @name DropdownFilter - A Collapse rendering a Filter Option
 * @param filter - The filter to be rendered.
 * @param label - The label displayed above the collapse.
 * @param isExpanded - Determines if the filter is currently expanded.
 * @param onExpand - The function to be called when the filter is expanded.
 * @example
 * <DropdownFilter filter="Subtype" label="Subtypes" isExpanded={true} onExpand={() => {}} />
 */
export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  filter,
  label,
  isExpanded,
  onExpand,
}) => {
  // LOCAL STATES
  const { searchParams, setFilters } = useURLQuery();

  // HOOKS
  const sound = useSoundEffect();

  // LOGIC
  /**
   * Determines if the filter is disabled.
   */
  const setDisabled = React.useCallback(() => {
    if (filter === 'Locations') {
      return true;
    }
    return false;
  }, [filter]);

  const isDisabled = setDisabled();

  /**
   * Handles Rendering a Filter Component
   * @param filterName - The filter to be rendered.
   */
  const getFilterComponent = React.useCallback((filterName: string) => {
    switch (filterName) {
      case 'Subtype':
        return <SubTypeFilter size="small" />;
      case 'Locations':
        return <LocationsFilter size="medium" />;
      case 'Scheduling':
        return <SchedulingDropdownFilter />;
      case 'Ratings':
        return <RatingsFilter />;
      case 'Pay':
        return <UECFilter />;
    }
  }, []);
  /** Calls {@link getFilterComponent} */
  const filterComponent = getFilterComponent(filter);

  /**
   * Checks if a filter is set for a Rendered Filter
   * @param filterName - The filter to be checked.
   */
  const checkFilterSet = React.useCallback(
    (filterName: string) => {
      switch (filterName) {
        case 'Subtype':
          return searchParams.has(QueryNames.Subtype);
        case 'Locations':
          return searchParams.has(QueryNames.Locations);
        case 'Scheduling':
          return (
            searchParams.has(QueryNames.BidBefore) ||
            searchParams.has(QueryNames.BidAfter) ||
            searchParams.has(QueryNames.StartBefore) ||
            searchParams.has(QueryNames.StartAfter) ||
            searchParams.has(QueryNames.EndBefore) ||
            searchParams.has(QueryNames.EndAfter) ||
            searchParams.has(QueryNames.Duration)
          );
        case 'Ratings':
          return (
            searchParams.has(QueryNames.EmployerRating) ||
            searchParams.has(QueryNames.ContractorRating)
          );
        case 'Pay':
          return (
            searchParams.has(QueryNames.UECRangeMax) ||
            searchParams.has(QueryNames.UECRangeMin) ||
            searchParams.has(QueryNames.PayStructure)
          );
        default:
          return 0;
      }
    },
    [searchParams],
  );
  /** Calls {@link checkFilterSet} */
  const isFiltersSet = checkFilterSet(filter);

  /**
   * Finds the Values of a Filter for Filter Arrays
   */
  const getFilterValues = React.useCallback(
    (filterName: string) => {
      switch (filterName) {
        case 'Subtype':
          return searchParams.getAll(QueryNames.Subtype);
        case 'Locations':
          return searchParams.getAll(QueryNames.Locations);
        default:
          return [];
      }
    },
    [searchParams],
  );
  /** Calls {@link getFilterValues} */
  const filterValues = getFilterValues(filter);

  /**
   * Handles Deleting a single Item from an Array Filter
   * @param valueToDelete - The value to be deleted from array.
   * @fires
   * - {@link setFilters} - Updates the URL query with the new filter values.
   * - sound.playSound('toggleOff')
   */
  const handleDeleteFilterItem = useCallback(
    (valueToDelete: string) => {
      const filterToUpdate = QueryNames[filter as keyof typeof QueryNames];
      const updatedFilters = searchParams
        .getAll(valueToDelete)
        .filter((value) => value !== valueToDelete);
      sound.playSound('toggleOff');
      setFilters(filterToUpdate, updatedFilters);
    },
    [searchParams, setFilters, filter, sound],
  );

  /**
   * Retrieves the list of QueryNames associated with a specific Filter.
   * @param filter - The Filter Option
   */
  const getFilterToClear = React.useCallback((filter: string): QueryNames[] => {
    switch (filter) {
      case 'Subtype':
        return [QueryNames.Subtype];
      case 'Locations':
        return [QueryNames.Locations];
      case 'Scheduling':
        return [
          QueryNames.BidAfter,
          QueryNames.BidBefore,
          QueryNames.EndAfter,
          QueryNames.EndBefore,
          QueryNames.StartAfter,
          QueryNames.StartBefore,
        ];
      case 'Ratings':
        return [QueryNames.EmployerRating, QueryNames.ContractorRating];
      case 'Pay':
        return [QueryNames.UECRangeMin, QueryNames.UECRangeMax, QueryNames.PayStructure];
      default:
        return [];
    }
  }, []);

  /**
   * Handles clearing all the Queries associated with the specific Filter.
   * @param filter - The Filter Option
   * @fires
   * - {@link setFilters} - Updates the URL query with the new filter values.
   * - sound.playSound('toggleOff')
   */
  const handleClearAll = React.useCallback(() => {
    const filtersToClear = getFilterToClear(filter);
    filtersToClear.forEach((filterToUpdate) => {
      setFilters(filterToUpdate, []);
    });
    sound.playSound('toggleOff');
  }, [getFilterToClear, filter, sound, setFilters]);

  /**
   * Determins the Text Color of the Label based on 2 Conditions
   * @param isDisabled - Indicates if the filter is disabled
   * @param isExpanded - Indicates if the filter is expanded or not
   */
  const getLabelColor = React.useCallback((isDisabled: boolean, isExpanded: boolean) => {
    if (isDisabled) return 'text.disabled';
    return isExpanded ? 'secondary.main' : 'text.secondary';
  }, []);
  /** Calls {@link getLabelColor} */
  const labelColor = getLabelColor(isDisabled, isExpanded);

  return (
    <Box
      data-testid={`ContractLedgerFilters__${filter}Container`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box
        data-testid={`ContractLedgerFilters-${filter}__TitleWrapper`}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          color: 'text.secondary',
        }}
      >
        <Badge
          invisible={!isFiltersSet}
          color="error"
          overlap="rectangular"
          variant="dot"
        >
          <Typography
            data-testid={`ContractLedgerFilters-${filter}__TitleDropDown`}
            variant="body1"
            onClick={onExpand}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              color: labelColor,
              cursor: 'pointer',
              fontWeight: 'bold',
              textShadow: '0 0 5px rgba(33,150,243,.3)',
              '&:hover': {
                color: isDisabled ? 'action.disabled' : 'text.primary',
                cursor: isDisabled ? 'default' : 'pointer',
                textShadow: '0 0 5px rgba(255,255,245,.6)',
              },
            }}
          >
            {label}
            <ArrowRight
              color={isExpanded ? 'secondary' : 'inherit'}
              sx={{
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 150ms',
              }}
            />
          </Typography>
        </Badge>
      </Box>
      <Collapse
        data-testid={`ContractLedgerFilters-${filter}__FilterCollapse`}
        in={isExpanded}
        sx={{
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <ComponentContainer
            data-testid={`ContractLedgerFilters-${filter}-FilterCollapse__CollapseWrapper`}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              p: '1em',
              m: '.5em',
              justifyContent: 'space-between',
              alignItems: 'center',
              maxWidth: '100%',
              flex: '0 1 auto',
              boxSizing: 'border-box',
              gap: '1em',
            }}
          >
            <Box
              data-testid={`ContractLedgerFilters-${filter}-FilterCollapse__FilterComponentWrapper`}
              sx={{
                minWidth: '200px',
                flexShrink: 0,
              }}
            >
              {filterComponent}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                height: '100%',
              }}
            >
              <ClearAllButton onClear={handleClearAll} />
              {QueryNames[filter as unknown as keyof typeof QueryNames] ===
                QueryNames.Subtype && (
                <PopupFormDisplay
                  data-testid={`ContractLedgerFilters-${filter}-FilterCollapse__FilterListWrapper`}
                  sx={{
                    display: 'flex',
                    flexDitection: 'row',
                    flexWrap: 'wrap',
                    padding: '.5em',
                    justifyContent: !isFiltersSet ? 'center' : '',
                    alignItems: !isFiltersSet ? 'center' : '',
                    minWidth: '150px',
                  }}
                >
                  {!isFiltersSet ? (
                    <Typography
                      variant="body2"
                      color="grey"
                      sx={{
                        textShadow: '0 0 5px rgba(0,0,0,.8)',
                      }}
                    >
                      No Filters Set
                    </Typography>
                  ) : (
                    filterValues.map((value) => (
                      <Chip
                        key={value}
                        label={value && value.charAt(0).toUpperCase() + value.slice(1)}
                        size={'small'}
                        variant="outlined"
                        color="secondary"
                        sx={{ m: '.2em' }}
                        onDelete={() => {
                          if (value) {
                            handleDeleteFilterItem(value);
                            sound.playSound('toggleOff');
                          }
                        }}
                      />
                    ))
                  )}
                </PopupFormDisplay>
              )}
            </Box>
          </ComponentContainer>
        </Box>
      </Collapse>
    </Box>
  );
};
