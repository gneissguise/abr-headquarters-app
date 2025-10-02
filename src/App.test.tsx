import { render, screen, waitFor, within } from 'solid-testing-library';
import { MemoryRouter, Route } from '@solidjs/router';
import { vi } from 'vitest';
import HomePage from './pages/HomePage';

// Mock the appData module
vi.mock('../data/appData', () => ({
  processedData: () => mockProcessedData,
}));

const mockProcessedData = {
  Alaska: {
    averageCalories: 114,
    averageFat: 3.9,
    fish: [/* ... */],
  },
  'Pacific Islands': {
    averageCalories: 128,
    averageFat: 3.2,
    fish: [/* ... */],
  },
  'Greater Atlantic': {
    averageCalories: 105,
    averageFat: 2.9,
    fish: [/* ... */],
  },
  'West Coast': {
    averageCalories: 114,
    averageFat: 3.6,
    fish: [/* ... */],
  },
  Southeast: {
    averageCalories: 113,
    averageFat: 2.7,
    fish: [/* ... */],
  },
};

describe('<HomePage />', () => {
  it('fetches and displays regional nutrition data', async () => {
    render(() => (
      <MemoryRouter>
        <Route path="" component={HomePage} />
      </MemoryRouter>
    ));

    await waitFor(() => {
      const alaskaCard = screen.getByText('Alaska').closest('.region-card');
      
      const alaskaCalories = within(alaskaCard).getByText((content, element) => {
        return element.textContent === 'Average Calories: 114 calories';
      });
      const alaskaFat = within(alaskaCard).getByText((content, element) => {
        return element.textContent === 'Average Fat: 3.9 grams';
      });

      expect(alaskaCard).toBeInTheDocument();
      expect(alaskaCalories).toBeInTheDocument();
      expect(alaskaFat).toBeInTheDocument();
      
      expect(screen.getByText('Pacific Islands')).toBeInTheDocument();
    });
  });
});