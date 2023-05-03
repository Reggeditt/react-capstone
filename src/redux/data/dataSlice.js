import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('data/fetchData', async (_, thunkAPI) => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  let { stateData } = thunkAPI.getState();
  stateData = data;
  return stateData;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      let { data } = state;
      data = action.payload;
      return data;
    },
  },
});

export default dataSlice.reducer;
