import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import {
  ICreateUserRatingBody,
  IUserRating,
} from 'vl-shared/src/schemas/UserRatingsSchema';

import NetworkService from '@/Services/NetworkService';

export const POST_NEW_RATING = 'POST v1/ratings/contract';

export const postNewContractRating = createAsyncThunk<IUserRating, ICreateUserRatingBody>(
  POST_NEW_RATING,
  async (ratingData: ICreateUserRatingBody, { rejectWithValue }) => {
    try {
      Logger.info('RatingData Post Attempt: ', ratingData);
      const response = await NetworkService.POST(
        '/v1/ratings/contract',
        ratingData,
        AuthUtil.getAccessHeader(),
      );
      return response.data as IUserRating;
    } catch (error) {
      Logger.error('Error creating rating:', error);
      return rejectWithValue(error);
    }
  },
);
