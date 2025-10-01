import { render, screen, waitFor } from 'solid-testing-library';
import { vi } from 'vitest';
import HomePage from './pages/HomePage'; // This import will fail initially
import * as fishDataService from './services/fishData';

// Mock the entire fishData service
vi.mock('./services/fishData');

const mockProcessedData = {
  Alaska: {
    averageCalories: 175,
    averageFat: 10.5,
    fish: [/* ... */],
  },
  'Pacific Islands': {
    averageCalories: 100,
    averageFat: 2.5,
    fish: [/* ... */],
  },
};

describe('<HomePage />', () => {
  it('fetches and displays regional nutrition data', async () => {
    // Tell our mock function what to return when called
    vi.spyOn(fishDataService, 'processFishData').mockReturnValue(mockProcessedData);
    
    // We also need a mock for fetchFishData, which createResource will call.
    vi.spyOn(fishDataService, 'fetchFishData').mockResolvedValue([]);

    render(() => <HomePage />);

    // `waitFor` is essential for async operations like data fetching.
    await waitFor(() => {
      // Check if the Alaska data is rendered correctly
      const alaskaHeader = screen.getByText('Alaska');
      const alaskaCalories = screen.getByText(/Average Calories: 175/i);
      const alaskaFat = screen.getByText(/Average Fat: 10.5g/i);

      expect(alaskaHeader).toBeInTheDocument();
      expect(alaskaCalories).toBeInTheDocument();
      expect(alaskaFat).toBeInTheDocument();
      
      // Check for Pacific Islands data as well
      expect(screen.getByText('Pacific Islands')).toBeInTheDocument();
    });
  });
});