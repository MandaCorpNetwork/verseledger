import { createAsyncThunk } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';

import NetworkService from '@/Services/NetworkService';

export const POST_DELAY_RATING = 'POST v1/ratings/contract/delay';

export const postDelayRating = createAsyncThunk<void, string>(
  POST_DELAY_RATING,
  async (contractId: string) => {
    try {
      await NetworkService.POST(`/v1/ratings/contract/${contractId}/delayRating`, {});
    } catch (error) {
      Logger.error(`Error delaying rating: ${error}`);
      return Promise.reject(error);
    }
  },
);
