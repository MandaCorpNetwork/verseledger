import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { type SxProps } from '@mui/material';
import { type Theme } from '@mui/material/styles';
import { useFilterUtils } from '@Utils/Hooks/useFilterUtils';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import React from 'react';

import { CurrencyInput } from '../../../Inputs/CurrencyInput';

type CurrencyRangeProps = {
  sx?: SxProps<Theme>;
};

/**
 * @description A Range Input Component for Currency
 * ___
 * TODO:
 * - Optimize Input Perfomance using Local State with a useEffect for Smoother Numeric Display
 */
export const CurrencyRange: React.FC<CurrencyRangeProps> = ({ sx }) => {
  const { searchParams } = useURLQuery();
  const filterUtils = useFilterUtils();
  return (
    <>
      <CurrencyInput
        label="Minimum Pay"
        onChange={(e) => filterUtils.setNumericFilter(e, QueryNames.UECRangeMin)}
        onClear={() => filterUtils.clearFilters(QueryNames.UECRangeMin)}
        value={searchParams.get(QueryNames.UECRangeMin) ?? ''}
        sx={{
          ...sx,
        }}
      />
      <CurrencyInput
        label="Maximum Pay"
        onChange={(e) => filterUtils.setNumericFilter(e, QueryNames.UECRangeMax)}
        onClear={() => filterUtils.clearFilters(QueryNames.UECRangeMax)}
        value={searchParams.get(QueryNames.UECRangeMax) ?? ''}
        sx={{
          ...sx,
        }}
      />
    </>
  );
};
