import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { getSubtypeOptions } from '@Utils/Contracts/ContractTypeUtils';
import { numericFieldInput } from '@Utils/numericFilter';
import React, { useCallback, useMemo } from 'react';

import { useURLQuery } from './useURLQuery';

export const useFilterUtils = () => {
  const { searchParams, setFilters } = useURLQuery();

  /**
   * TODO:
   * - Convert Usage to New FilterCount
   */
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

  const dynamicFilterCount = useCallback(
    (fields: QueryNames | QueryNames[]) => {
      const queryArray = Array.isArray(fields) ? fields : [fields];

      const totalCount = queryArray.reduce((count, field) => {
        const fieldCount = searchParams.getAll(field).length;
        const isBooleanFilter = fieldCount === 0 && searchParams.has(field) ? 1 : 0;

        return count + fieldCount + isBooleanFilter;
      }, 0);
      return totalCount;
    },
    [searchParams],
  );

  const contractSubtypeList = useMemo(() => {
    return getSubtypeOptions();
  }, []);

  const dateFilterValues = useMemo(() => {
    return (queryName: QueryNames): Date | null => {
      const dateStr = searchParams.get(queryName);
      return dateStr ? new Date(dateStr) : null;
    };
  }, [searchParams]);

  const setNumericFilter = useCallback(
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

  const clearFilters = useCallback(
    (fields: QueryNames | QueryNames[]) => {
      if (Array.isArray(fields)) {
        for (const field of fields) {
          setFilters(field, []);
        }
      } else {
        setFilters(fields, []);
      }
    },
    [setFilters],
  );

  return {
    filterCount,
    contractSubtypeList,
    dateFilterValues,
    setNumericFilter,
    clearFilters,
    dynamicFilterCount,
  };
};
