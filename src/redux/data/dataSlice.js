import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTvShows = createAsyncThunk('data/fetchData', async (_, thunkAPI) => {
  const promises = [];
  for (let showId = 1; showId < 15; showId += 1) {
    promises.push(
      fetch(`https://api.tvmaze.com/shows/${showId}`)
        .then((response) => response.json()),
    );
  }

  let { stateData } = thunkAPI.getState();
  const result = await Promise.all(promises);
  stateData = result;
  return stateData;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchTvShows.fulfilled]: (state, action) => {
      let { data } = state;
      data = action.payload;
      return data;
    },
  },
});

export default dataSlice.reducer;
