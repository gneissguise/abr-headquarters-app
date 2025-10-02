import type { Component } from 'solid-js';
import { For, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { processedData } from '../data/appData'; // Import the shared resource

/**
 * @description The home page of the application, which displays a list of regions with their average nutritional information.
 * @returns The home page component.
 */
const HomePage: Component = () => {
  return (
    <div class="home-page">
      <h1>NOAA Fisheries Regions</h1>
      <p>Average nutritional information for fish per serving in each region.</p>
      
      <Show when={!processedData.loading} fallback={<p class="loading-indicator">Loading regions...</p>}>
        <div class="region-list">
          <For each={Object.keys(processedData() || {})}>
            {(region) => (
              <A href={`/region/${encodeURIComponent(region)}`} class="region-link" title="Click to view more details">
                <div class="region-card">
                  <h2>{region}</h2>
                  <p>Average Calories: <strong>{processedData()![region].averageCalories.toFixed(0)} calories</strong></p>
                  <p>Average Fat: <strong>{processedData()![region].averageFat.toFixed(1)} grams</strong></p>
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