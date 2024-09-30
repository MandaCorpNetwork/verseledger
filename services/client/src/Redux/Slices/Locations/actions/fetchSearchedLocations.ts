// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { composeQuery } from '@Utils/composeQuery';
// import { Logger } from '@Utils/Logger';
// import { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';
// import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
// import { ILocationSearch } from 'vl-shared/src/schemas/SearchSchema';

// import NetworkService from '@/Services/NetworkService';

// export const fetchSearchedLocations = createAsyncThunk(
//   '/v1/locations/search',
//   async (params: ILocationSearch) => {
//     try {
//       const response = await NetworkService.GET<IPaginatedData<ILocation>>(
//         `/v1/locations?${composeQuery({ search: params })}`,
//       );
//       return response.data;
//     } catch (error) {
//       Logger.error(error);
//     }
//   },
// );
