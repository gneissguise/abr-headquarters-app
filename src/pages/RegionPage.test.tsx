import { render, screen, waitFor } from 'solid-testing-library';
import { MemoryRouter, Route, createMemoryHistory } from '@solidjs/router';
import { vi } from 'vitest';
import { RegionPage } from './RegionPage';
import * as fishDataService from '../services/fishData';

// Mock for the entire fishData service
vi.mock('../services/fishData');

// Mocked data element
const mockProcessedData = {
  Alaska: {
    averageCalories: 175,
    averageFat: 10.5,
    fish: [
      {
        'Species Name': 'Chinook Salmon',
        Calories: '200',
        'Fat, Total': '13 g',
        Texture: 'Firm',
        Taste: 'Rich',
        'Species Illustration Photo': {
          src: 'some-salmon-image.jpg',
          alt: 'A Chinook Salmon',
        },
        'NOAAFisheriesRegion': 'Alaska', 
      },
    ],
  },
};

describe('<RegionPage />', () => {
  it('displays the details for a specific region based on the URL', async () => {
    // Tell our mock function what to return when called
    vi.spyOn(fishDataService, 'processFishData').mockReturnValue(mockProcessedData);
    vi.spyOn(fishDataService, 'fetchFishData').mockResolvedValue([]);

    // Create history object
    const history = createMemoryHistory();
    // Set the initial url to the Alaska region
    history.set({ value: '/region/Alaska' });

    render(() => (
      <MemoryRouter history={history}>
        <Route path="/region/:name" component={RegionPage} />
      </MemoryRouter>
    ));

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /alaska/i })
      ).toBeInTheDocument();
    });
  });
});