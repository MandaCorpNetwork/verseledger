import { fetchContractsBySubtypes } from '@Redux/Slices/Contracts/actions/fetch/fetchSearchContracts';
import { Logger } from '@Utils/Logger';
import { QueryNames } from '@Utils/QueryNames';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useURLQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const handleQueryFetchRequest = async () => {
      Logger.info(`Attempting Subtype Contract Fetch...`);
      const subtype = searchParams.get(QueryNames.Subtype);
      if (subtype) {
        Logger.info(`Subtype from URL query: ${subtype}`);
        const subtypesArray = subtype.split(',');
        if (subtypesArray.length > 0) {
          try {
            await fetchContractsBySubtypes(subtypesArray);
            Logger.info(
              `Successfully fetched contracts for subtypes: ${subtypesArray.join(', ')}`,
            );
          } catch (e) {
            Logger.error(`Error querying contracts for subtypes: ${e}`);
          }
        }
      }
    };

    handleQueryFetchRequest();

    window.addEventListener('popstate', handleQueryFetchRequest);

    return () => {
      window.removeEventListener('popstate', handleQueryFetchRequest);
    };
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
    const params = new URLSearchParams();
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
  };

  return [searchParams, setValue, overwriteURLQuery] as const;
};
