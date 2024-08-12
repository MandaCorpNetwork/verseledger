import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import {
  ICreateContractRatingsBody,
  IUserRating,
} from 'vl-shared/src/schemas/UserRatingsSchema';

import NetworkService from '@/Services/NetworkService';

export const POST_NEW_RATINGS = 'POST v1/ratings/contract';

export const postNewContractRating = createAsyncThunk<
  IUserRating[],
  ICreateContractRatingsBody
>(POST_NEW_RATINGS, async (ratingData: ICreateContractRatingsBody) => {
  try {
    Logger.info('RatingData Post Attempt: ', ratingData);
    const response = await NetworkService.POST(
      '/v1/ratings/contract',
      ratingData,
      AuthUtil.getAccessHeader(),
    );
    return response.data as IUserRating[];
  } catch (error) {
    Logger.error('Error creating rating:', error);
    return Promise.reject(error);
  }
});
