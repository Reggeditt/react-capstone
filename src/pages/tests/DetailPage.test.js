import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import DetailPage from '../DetailPage';

describe('DetailPage', () => {
  it('renders without crashing', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      data: [
        {
          name: { common: 'Afghanistan' },
          population: 38928346,
          area: 652230,
          flags: { png: 'https://restcountries.com/data/afg.png' },
          ccn3: '004',
          continents: ['Asia'],
        },
        {
          name: { common: 'Albania' },
          population: 2845955,
          area: 28748,
          flags: { png: 'https://restcountries.com/data/alb.png' },
          ccn3: '008',
          continents: ['Europe'],
        },
      ],
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailPage />
        </MemoryRouter>
      </Provider>,
    );
  });
});
