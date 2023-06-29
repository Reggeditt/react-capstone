import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './data/dataSlice';
import detailsReducer from './details/detailsSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
    details: detailsReducer,
  },
});

export default store;
