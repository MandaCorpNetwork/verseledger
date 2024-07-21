import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { composeQuery } from '@Utils/composeQuery';
import { Logger } from '@Utils/Logger';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';
import { IContractSearch } from 'vl-shared/src/schemas/SearchSchema';

import NetworkService from '@/Services/NetworkService';

export const fetchContracts = createAsyncThunk(
  '/v1/contracts/search',
  async (params: IContractSearch) => {
    try {
      const response = await NetworkService.GET(
        `/v1/contracts?${composeQuery({ search: params })}`,
        AuthUtil.getAccessHeader(),
      );
      return response.data as IPaginatedData<IContract>;
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
