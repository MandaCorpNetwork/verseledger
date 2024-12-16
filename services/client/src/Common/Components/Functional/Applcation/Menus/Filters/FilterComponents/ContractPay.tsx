import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { CurrencyInput } from '@Common/Components/Functional/Applcation/Inputs/CurrencyInput';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { Box, Typography } from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { numericFieldInput } from '@Utils/numericFilter';
import React from 'react';

type ContractPayFilterProps = {
  ['data-testid']?: string;
};

/**
 * @description Filter Component for Contract Pay.
 * ___
 * TODO:
 * - Create Additive Filtering for Different Pay Structures
 * - Improve Render Performance by Removing useMemo
 */
export const ContractPayFilter: React.FC<ContractPayFilterProps> = ({
  'data-testid': testid = 'FilterMenu',
}) => {
  const { searchParams, setFilters } = useURLQuery();
  const themeExtend = useDynamicTheme();

  const layout = React.useMemo(() => {
    const filterListContainer = themeExtend.layout(
      'ContractPayFilter.FilterListContainer',
    );
    const filterGroupContainer = themeExtend.layout(
      'ContractPayFilter.FilterGroupContainer',
    );
    const filterGroupLabel = themeExtend.layout('ContractPayFilter.FilterGroupLabel');
    const filterGroupWrapper = themeExtend.layout('ContractPayFilter.FilterGroupWrapper');

    return {
      filterListContainer,
      filterGroupContainer,
      filterGroupWrapper,
      filterGroupLabel,
    };
  }, [themeExtend]);

  const structure = searchParams.get(QueryNames.PayStructure) ?? 'flat';

  const handleRangeFilter = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: QueryNames) => {
      const value = numericFieldInput(e.target.value);
      if (value) {
        setFilters(field, value.toString());
      } else {
        setFilters(field, []);
      }
    },
    [setFilters],
  );

  const handleRangeClear = React.useCallback(
    (field: QueryNames) => {
      setFilters(field, []);
    },
    [setFilters],
  );

  const renderRangeField = React.useCallback(() => {
    switch (structure) {
      case 'FLATRATE':
      case 'flat':
      default:
        return (
          <>
            <CurrencyInput
              label="Minimum Pay"
              onChange={(e) => handleRangeFilter(e, QueryNames.UECRangeMin)}
              onClear={() => handleRangeClear(QueryNames.UECRangeMin)}
              value={searchParams.get(QueryNames.UECRangeMin) ?? ''}
            />
            <CurrencyInput
              label="Maximum Pay"
              onChange={(e) => handleRangeFilter(e, QueryNames.UECRangeMax)}
              onClear={() => handleRangeClear(QueryNames.UECRangeMax)}
              value={searchParams.get(QueryNames.UECRangeMax) ?? ''}
            />
          </>
        );
    }
  }, [handleRangeClear, handleRangeFilter, searchParams, structure]);
  return (
    <Box
      aria-label="Contract Pay Filter List Container"
      id="FilterGroup_ContractPay"
      data-testid={`${testid}__ContractPay_GroupWrapper`}
      sx={{
        display: 'flex',
        gap: '1em',
        flexDirection: 'column',
        ...layout.filterListContainer,
      }}
    >
      <ComponentDisplay
        aria-label="Pay Range Filters"
        id="ContractPay__UECRangeGroup"
        data-testid={`${testid}-ContractPay__UECRange_Container`}
        sx={{
          p: '0.5em',
          ...layout.filterGroupContainer,
        }}
      >
        <Typography
          aria-labelledby="ContractPay__UECRangeGroup"
          data-testid={`${testid}-ContractPay-UECRange__Label`}
          variant="subtitle2"
          sx={{
            display: 'flex',
            textAlign: 'left',
            width: '100%',
            pl: '1em',
            ...layout.filterGroupLabel,
          }}
        >
          UEC Range
        </Typography>
        <Box
          aria-labelledby="ContractPay__UECRangeGroup"
          data-testid={`${testid}-ContractPay-UECRange__FilterGroup_Wrapper`}
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-evenly',
            ...layout.filterGroupWrapper,
          }}
        >
          {renderRangeField()}
        </Box>
      </ComponentDisplay>
      <ComponentDisplay></ComponentDisplay>
    </Box>
  );
};
