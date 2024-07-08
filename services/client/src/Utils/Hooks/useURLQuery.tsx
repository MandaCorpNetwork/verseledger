import { Logger } from '@Utils/Logger';
import { ArchetypeToSubtypes, QueryNames } from '@Utils/QueryNames';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useURLQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setValue = (name: QueryNames, value: string | string[]) => {
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
  };

  const overwriteURLQuery = (
    newState: Partial<Record<QueryNames, string | string[]>>,
  ) => {
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
  };

  useEffect(() => {
    const handleQueryFetchRequest = async () => {
      Logger.info(`Attempting Filtered Contract Fetch...`);
      const selectedSubtype = searchParams.getAll(QueryNames.Subtype);
      const selectedArchetype = searchParams.getAll(QueryNames.Archetype);
      const selectedArchToSub = selectedArchetype.flatMap((archetype) => {
        return ArchetypeToSubtypes[archetype] ?? [];
      });
      const combinedSubtypes = Array.from(
        new Set([...selectedSubtype, ...selectedArchToSub]),
      );

      if (combinedSubtypes) {
        Logger.info(`Preparing Subtype Fetch Array: ${selectedSubtype}`);
        Logger.info(`Preparing Archetype Fetch Array: ${selectedArchetype}`);
        // const subtypesArray = selectedSubtype.join(',').split(',');
        if (combinedSubtypes.length > 0) {
          try {
            await fetchContractsBySubtypes(combinedSubtypes);
            Logger.info(
              `Successfully fetched contracts for subtypes: ${combinedSubtypes.join(', ')}`,
            );
          } catch (e) {
            Logger.error(`Error querying contracts for subtypes: ${e}`);
          }
        }
      }
    };
    handleQueryFetchRequest();
    Logger.info(`Current search params: ${searchParams}`);
    window.addEventListener('popstate', handleQueryFetchRequest);

    return () => {
      window.removeEventListener('popstate', handleQueryFetchRequest);
    };
  }, [searchParams]);

  const setValue = (name: QueryNames, value: string | string[]) => {
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
  };

  const overwriteURLQuery = (
    newState: Partial<Record<QueryNames, string | string[]>>,
  ) => {
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
  };

  useEffect(() => {
    const handleQueryFetchRequest = async () => {
      Logger.info(`Attempting Filtered Contract Fetch...`);
      const selectedSubtype = searchParams.getAll(QueryNames.Subtype);
      const selectedArchetype = searchParams.getAll(QueryNames.Archetype);
      //const contractManagerTab = searchParams.get(QueryNames.ContractManagerTab);

      // if (contractManagerTab) {
      //   if (contractManagerTab === 'employed') {

      //   }
      //   if (contractManagerTab === 'owned') {

      //   }
      //   if (contractManagerTab === 'pending') {

      //   }
      //   if (contractManagerTab === 'offers') {

      //   }
      //   if (contractManagerTab === 'closed') {

      //   }
      // }

      const selectedArchToSub = selectedArchetype.flatMap((archetype) => {
        return ArchetypeToSubtypes[archetype] ?? [];
      });
      const combinedSubtypes = Array.from(
        new Set([...selectedSubtype, ...selectedArchToSub]),
      );

      if (combinedSubtypes) {
        Logger.info(`Preparing Subtype Fetch Array: ${selectedSubtype}`);
        Logger.info(`Preparing Archetype Fetch Array: ${selectedArchetype}`);
        // const subtypesArray = selectedSubtype.join(',').split(',');
        if (combinedSubtypes.length > 0) {
          try {
            await fetchContractsBySubtypes(combinedSubtypes);
            Logger.info(
              `Successfully fetched contracts for subtypes: ${combinedSubtypes.join(', ')}`,
            );
          } catch (e) {
            Logger.error(`Error querying contracts for subtypes: ${e}`);
          }
        }
      }
    };
    handleQueryFetchRequest();
    Logger.info(`Current search params: ${searchParams}`);
    window.addEventListener('popstate', handleQueryFetchRequest);

    return () => {
      window.removeEventListener('popstate', handleQueryFetchRequest);
    };
  }, [searchParams]);

  return [searchParams, setValue, overwriteURLQuery] as const;
};
