import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: undefined,
  userId: undefined,
  login: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});
