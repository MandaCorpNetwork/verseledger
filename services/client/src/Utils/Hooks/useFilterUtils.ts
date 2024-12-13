import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { getSubtypeOptions } from '@Utils/Contracts/ContractTypeUtils';
import { useCallback, useMemo } from 'react';

import { useURLQuery } from './useURLQuery';

export const useFilterUtils = () => {
  const { searchParams } = useURLQuery();

  const filterCount = useCallback(() => {
    const counts = [
      searchParams.getAll(QueryNames.ContractSubtype).length,
      searchParams.getAll(QueryNames.Locations).length,
      +searchParams.has(QueryNames.UECRangeMin),
      +searchParams.has(QueryNames.UECRangeMax),
      +searchParams.has(QueryNames.EmployerRating),
      +searchParams.has(QueryNames.ContractorRating),
      searchParams.getAll(QueryNames.Status).length,
      searchParams.getAll(QueryNames.BidStatus).length,
      +searchParams.has(QueryNames.BidAfter),
      +searchParams.has(QueryNames.BidExact),
      +searchParams.has(QueryNames.StartBefore),
      +searchParams.has(QueryNames.StartAfter),
      +searchParams.has(QueryNames.StartExact),
      +searchParams.has(QueryNames.EndBefore),
      +searchParams.has(QueryNames.EndAfter),
      +searchParams.has(QueryNames.EndExact),
      +searchParams.has(QueryNames.Duration),
      searchParams.getAll(QueryNames.ItemType).length,
      searchParams.getAll(QueryNames.PayStructure).length,
    ];
    return counts.reduce((sum, count) => sum + count, 0);
  }, [searchParams]);

  const contractSubtypeList = useMemo(() => {
    return getSubtypeOptions();
  }, []);

  return { filterCount, contractSubtypeList };
};
