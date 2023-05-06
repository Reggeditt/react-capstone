import dataReducer, { fetchData } from '../../redux/data/dataSlice';

describe('dataSlice', () => {
  describe('extraReducers', () => {
    it('should handle fetchData.fulfilled', () => {
      const initialState = [];
      const action = {
        type: fetchData.fulfilled.type,
        payload: [{ name: 'Country 1' }, { name: 'Country 2' }],
      };
      const nextState = dataReducer(initialState, action);

      expect(nextState).toEqual(action.payload);
    });
  });
});
