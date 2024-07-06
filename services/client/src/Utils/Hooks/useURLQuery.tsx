// useFilters.tsx
import { Logger } from '@Utils/Logger';
import { QueryNames } from '@Utils/QueryNames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface QueryParams {
  [key: string]: string | string[] | undefined;
}

export const useURLQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [queryParams, setQueryParams] = useState<QueryParams>({});

  useEffect(() => {
    const params: QueryParams = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value.toString().split(',');
    }
    setQueryParams(params);
    Logger.info(`URLQueryParameters: ${JSON.stringify(params)}`);
  }, [searchParams]);

  const setValue = (name: QueryNames, value: string | string[]) => {
    setSearchParams((params) => {
      params.delete(name);
      if (typeof value === 'string') {
        params.set(name, value);
      } else {
        value.forEach((v) => params.append(name, v));
      }
      return params;
    });
  };

  const overwriteURLQuery = (
    newState: Partial<Record<QueryNames, string | string[]>>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newState).forEach(([key, value]) => {
      if (value === undefined) {
        params.delete(key);
      } else if (typeof value === 'string') {
        params.set(key, value);
      } else {
        params.delete(key);
        value.forEach((v) => params.append(key, v));
      }
    });
    setSearchParams(params.toString());
  };

  return [searchParams, setValue, overwriteURLQuery] as const;
};
