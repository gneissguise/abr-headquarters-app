import { render, screen, waitFor } from 'solid-testing-library';
import { MemoryRouter, Route, createMemoryHistory } from '@solidjs/router';
import { vi } from 'vitest';
import { RegionPage } from './RegionPage';

// Mock the appData module
vi.mock('../data/appData', () => ({
  processedData: () => mockProcessedData,
}));

// Mocked data element
const mockProcessedData = {
  Alaska: { // Import the shared resource
    averageCalories: 175,
    averageFat: 10.5,
    fish: [
      {
        SpeciesName: 'Chinook Salmon',
        Calories: '200',
        FatTotal: '13 g',
        Texture: 'Firm',
        Taste: 'Rich',
        SpeciesIllustrationPhoto: {
          src: 'some-salmon-image.jpg',
          alt: 'A Chinook Salmon',
        },
        NOAAFisheriesRegion: 'Alaska', 
      },
    ],
  },
};

describe('<RegionPage />', () => {
  it('displays the details for a specific region based on the URL', async () => {
    // Create history object
    const history = createMemoryHistory();
    // Set the initial url to the Alaska region
    history.set({ value: '/region/Alaska' });

    render(() => (
      <MemoryRouter history={history}>
        <Route path="/region/:name" component={RegionPage} />
      </MemoryRouter>// Import the new Fish ty
    ));

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /alaska/i })
      ).toBeInTheDocument();
    });
  });
});