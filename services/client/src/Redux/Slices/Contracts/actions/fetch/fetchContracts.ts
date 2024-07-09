import { createAsyncThunk } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IContractSearch } from 'vl-shared/src/schemas/SearchSchema';

import NetworkService from '@/Services/NetworkService';

export const fetchContracts = createAsyncThunk(
  '/v1/contracts/search',
  async (params: IContractSearch) => {
    try {
      const builder = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        const value = params[key as keyof IContractSearch];
        if (value != null) {
          builder.append(
            `search[${key}]`,
            Array.isArray(value) ? value.join(',') : (value as unknown as string),
          );
        }
      });
      const response = await NetworkService.GET(`/v1/contracts?${builder.toString()}`);
      return response.data;
    } catch (error) {
      Logger.error(error);
    }
  },
);
// useEffect(() => {
//   const handleQueryFetchRequest = async () => {
//     Logger.info(`Attempting Filtered Contract Fetch...`);
//     const selectedSubtype = searchParams.getAll(QueryNames.Subtype);
//     const selectedArchetype = searchParams.getAll(QueryNames.Archetype);
//     const contractManagerTab = searchParams.get(QueryNames.ContractManagerTab);

//     if (contractManagerTab) {
//       if (contractManagerTab === 'employed') {
//         //Fetch Contracts by User ContractBids Accepted
//       }
//       if (contractManagerTab === 'owned') {
//         //Fetch Contracts by ContractOwner == User
//       }
//       if (contractManagerTab === 'pending') {
//         //Fetch Contracts By User ContractBids Pending
//       }
//       if (contractManagerTab === 'offers') {
//         //Fetch Contracts By User ContractBids Invited
//       }
//       if (contractManagerTab === 'closed') {
//         //Fetch Contracts by Contract Owner & ContractBids where ContractStatus == Completed
//       }
//     }

//     const selectedArchToSub = selectedArchetype.flatMap((archetype) => {
//       return ArchetypeToSubtypes[archetype] ?? [];
//     });
//     const combinedSubtypes = Array.from(
//       new Set([...selectedSubtype, ...selectedArchToSub]),
//     );

//     if (combinedSubtypes) {
//       Logger.info(`Preparing Subtype Fetch Array: ${selectedSubtype}`);
//       Logger.info(`Preparing Archetype Fetch Array: ${selectedArchetype}`);
//       // const subtypesArray = selectedSubtype.join(',').split(',');
//       if (combinedSubtypes.length > 0) {
//         try {
//           await fetchContractsBySubtypes(combinedSubtypes);
//           Logger.info(
//             `Successfully fetched contracts for subtypes: ${combinedSubtypes.join(', ')}`,
//           );
//         } catch (e) {
//           Logger.error(`Error querying contracts for subtypes: ${e}`);
//         }
//       }
//     }
//   };
//   handleQueryFetchRequest();
//   Logger.info(`Current search params: ${searchParams}`);
//   window.addEventListener('popstate', handleQueryFetchRequest);

//   return () => {
//     window.removeEventListener('popstate', handleQueryFetchRequest);
//   };
// }, [searchParams]);
