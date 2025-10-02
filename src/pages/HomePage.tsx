import type { Component } from 'solid-js'
import { createResource, For, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { fetchFishData, processFishData } from '../services/fishData';

const HomePage: Component = () => {
  // Using `createResource` for handling our async data coming from fetchFishData().
  const [processedData] = createResource(async () => {
    const rawData = await fetchFishData();
    return processFishData(rawData);
  });

  // On our HomePage we will show the Region cards with the average nutrition.
  // Cards may be clicked to route to the RegionPage where each fish is shown in more detail.
  return (
    <div class="home-page">
      <h1>NOAA Fisheries Regions</h1>
      <p>Average nutritional information for fish per serving in each region.</p>
      
      <Show when={!processedData.loading} fallback={<p>Loading data...</p>}>
        <div class="region-list">
          <For each={Object.keys(processedData() || {})}>
            {(region) => (
              <A href={`/region/${encodeURIComponent(region)}`} class="region-link" title="Click to view more details">
                <div class="region-card" >
                  <h2>{region}</h2>
                  <p>Average Calories: <strong>{processedData()![region].averageCalories.toFixed(0) + ' calories' || 'N/A'}</strong></p>
                  <p>Average Fat: <strong>{processedData()![region].averageFat.toFixed(1) + ' grams' || 'N/A'}</strong></p>
                </div>
              </A>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default HomePage;