// src/pages/HomePage.tsx

import { Component, createResource, For, Show } from 'solid-js';
import { fetchFishData, processFishData } from '../services/fishData';

const HomePage: Component = () => {
  // `createResource` is Solid's magic for handling async data.
  // It provides `loading`, `error`, and `data` states automatically.
  const [processedData] = createResource(async () => {
    const rawData = await fetchFishData();
    return processFishData(rawData);
  });

  return (
    <div class="home-page">
      <h1>NOAA Fisheries Regions</h1>
      <p>Average nutritional information for fish per serving in each region.</p>
      
      <Show when={!processedData.loading} fallback={<p>Loading data...</p>}>
        <div class="region-list">
          <For each={Object.keys(processedData() || {})}>
            {(region) => (
              <div class="region-card">
                <h2>{region}</h2>
                <p>Average Calories: {processedData()[region].averageCalories.toFixed(0)}</p>
                {/* Use toFixed(1) to match the test's expectation of "10.5g" */}
                <p>Average Fat: {processedData()[region].averageFat.toFixed(1)}g</p>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default HomePage;