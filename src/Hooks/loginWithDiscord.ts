import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginWithDiscord = createAsyncThunk('POST_discord', async (code: string) => {
  const response = await axios.post('http://localhost:3030/v1/auth/discord', {
    code,
  });
  console.log(response);
  return response;
});
