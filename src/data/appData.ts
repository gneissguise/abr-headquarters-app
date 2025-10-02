import { createResource } from 'solid-js';
import { fetchFishData, processFishData } from '../services/fishData';

// Create a single, reusable resource for our processed fish data
const [processedData] = createResource(async () => {
  const rawData = await fetchFishData();
  return processFishData(rawData);
});

export { processedData };
