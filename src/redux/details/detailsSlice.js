import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchShowData = createAsyncThunk('details/fetchShowData',
  async (_, thunkAPI) => {
    const { showName } = thunkAPI.getState().details;
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${showName}`);
    const data = await response.json();
    return data;
  });

const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    showName: '',
    showData: [],
    relatedShows: [],
  },
  reducers: {
    setShow: (state, action) => {
      const showName = action.payload;
      state.showName = showName;
    },
  },
  extraReducers: {
    [fetchShowData.fulfilled]: (state, action) => {
      const { showName } = state;
      const { payload } = action;
      const showData = payload.filter((show) => show.show.name === showName)[0];
      const relatedShows = payload.filter((show) => show.show.name !== showName);
      if (!state.showData.length) state.showData.push(showData);
      state.relatedShows = relatedShows;
    },
  },
});

export const { setShow } = detailsSlice.actions;

export default detailsSlice.reducer;
