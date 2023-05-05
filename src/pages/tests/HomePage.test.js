import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { expect } from '@jest/globals';
import HomePage from '../HomePage';
import dataReducer from '../../redux/data/dataSlice';

describe('HomePage component', () => {
  test('should render properly', () => {
    const mockData = [
      {
        name: 'Country 1', continents: ['Africa'], population: 1000000, area: 100,
      },
      {
        name: 'Country 2', continents: ['North America'], population: 2000000, area: 200,
      },
      {
        name: 'Country 3', continents: ['South America'], population: 3000000, area: 300,
      },
      {
        name: 'Country 4', continents: ['Antarctica'], population: 4000000, area: 400,
      },
      {
        name: 'Country 5', continents: ['Asia'], population: 5000000, area: 500,
      },
      {
        name: 'Country 6', continents: ['Europe'], population: 6000000, area: 600,
      },
      {
        name: 'Country 7', continents: ['Oceania'], population: 7000000, area: 700,
      },
    ];

    const mockStore = configureStore({
      reducer: {
        data: dataReducer,
      },
      preloadedState: mockData,
    });

    const { getByText } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Africa')).toBeInTheDocument();
    expect(getByText('North America')).toBeInTheDocument();
    expect(getByText('South America')).toBeInTheDocument();
    expect(getByText('Antarctica')).toBeInTheDocument();
    expect(getByText('Asia')).toBeInTheDocument();
    expect(getByText('Europe')).toBeInTheDocument();
    expect(getByText('Oceania')).toBeInTheDocument();
  });
});
