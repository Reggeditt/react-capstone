import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import DetailPage from '../DetailPage';
import store from '../../redux/store';

describe('DetailPage component', () => {
  test('renders the back arrow', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/Europe']}>
          <DetailPage />
        </MemoryRouter>
      </Provider>,
    );

    test('renders the back arrow', () => {
      render(<DetailPage />);
      const backArrows = screen.getAllByAltText('back arrow');
      expect(backArrows).toHaveLength(2);
      backArrows.forEach((backArrow) => {
        expect(backArrow).toBeInTheDocument();
      });
    });

    test('renders the details for a country in the selected continent', () => {
      render(<DetailPage />);
      expect(screen.getByText('Spain', { exact: false })).toBeInTheDocument();
      expect(screen.getByText('Area size: 505944')).toBeInTheDocument();
      expect(screen.getByText('population: 46940000')).toBeInTheDocument();
    });

    expect(screen.getByText('Spain')).toBeInTheDocument();
    expect(screen.getByText('Area size: 505944')).toBeInTheDocument();
    expect(screen.getByText('population: 46940000')).toBeInTheDocument();
  });

  test('renders the correct details when a different continent is selected', () => {
    render(<DetailPage />);
    const africaButton = screen.getByText('Africa');
    userEvent.click(africaButton);
    expect(screen.getByText('Nigeria', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Area size: 923768')).toBeInTheDocument();
    expect(screen.getByText('population: 211400000')).toBeInTheDocument();
  });
});
