// useFilters.tsx
import { useSearchParams } from 'react-router-dom';

import { QueryNames } from '@/Common/Definitions/QueryNames';

export const useURLQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setValue = (name: QueryNames, value: string | string[]) => {
    searchParams.delete(name);
    if (typeof value === 'string') {
      searchParams.set(name, value);
    } else {
      value.forEach((v) => searchParams.append(name, v));
    }
    setSearchParams(searchParams);
  };

  const overwriteURLQuery = (newState: { [key in QueryNames]?: string | string[] }) => {
    setSearchParams(newState);
  };

  return [searchParams, setValue, overwriteURLQuery] as const;
};
