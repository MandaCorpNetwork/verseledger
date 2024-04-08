import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk('GET_me', async (token: string) => {
  const response = await axios.get('http://localhost:3030/v1/users/@me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response);
  return response;
});
