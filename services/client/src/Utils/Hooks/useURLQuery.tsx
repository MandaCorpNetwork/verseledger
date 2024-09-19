import { Logger } from '@Utils/Logger';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const useURLQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilters = React.useCallback(
    (name: QueryNames, value: string | string[]) => {
      setSearchParams((params) => {
        Logger.info(`Updating filters: ${params}`);
        params.delete(name);
        if (typeof value === 'string') {
          params.set(name, value);
        } else {
          value.forEach((v) => params.append(name, v));
        }
        return params;
      });
    },
    [setSearchParams],
  );

  const overwriteURLQuery = React.useCallback(
    (newState: Partial<Record<QueryNames, string | string[]>>) => {
      const params = new URLSearchParams();
      Logger.info(`Updating filters: ${JSON.stringify(params)}`);
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.set(key, value.toString());
        }
      });
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
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  return [searchParams, setFilters, overwriteURLQuery];
};
