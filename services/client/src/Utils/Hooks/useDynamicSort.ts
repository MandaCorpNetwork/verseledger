import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { SortOption } from '@Common/Definitions/Search/SortOptions';
import { Logger } from '@Utils/Logger';
import { useCallback } from 'react';

import { useURLQuery } from './useURLQuery';

export const useDynamicSort = <T>() => {
  const { searchParams } = useURLQuery();

  const advSort = useCallback(
    (data: T[], sortOptions: SortOption<T>[]) => {
      const sortBy = searchParams.get(QueryNames.SortBy);
      // const sortDirection = searchParams.get(QueryNames.SortDirection);

      if (!sortBy) return data;

      const sortOption = sortOptions.find((option) => option.value === sortBy);
      if (!sortOption) {
        Logger.warn(
          'The Sorting Option does not exist on the Defined Sorting Options for this Object',
          sortBy,
          typeof data,
        );
        return data;
      }

      // return dynamicSort(data, sortOption, sortDirection === 'desc');
    },
    [searchParams],
  );

  return { advSort };
};
