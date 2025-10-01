import type { Component } from 'solid-js';
import { createMemo, createResource, For, Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import { fetchFishData, processFishData } from '../services/fishData';

export const RegionPage: Component = () => {
  // `useParams` is a hook from the router that gives us the dynamic
  // part of the URL. In our case, the region's name.
  const params = useParams();

  // We fetch and process ALL the data, just like the home page.
  const [processedData] = createResource(async () => {
    const rawData = await fetchFishData();
    return processFishData(rawData);
  });

  // `createMemo` creates a derived signal. It will only re-run when
  // one of its dependencies (processedData or params.name) changes.
  // This is an efficient way to get the specific data for our region.
  const regionData = createMemo(() => {
    const data = processedData();
    const name = params.name; // e.g., "Alaska"
    if (!data || !name) return null;
    return data[name];
  });

  return (
    <div class="region-page">
      <Show when={!processedData.loading} fallback={<p>Loading region data...</p>}>
        <Show when={regionData()} fallback={<p>Region not found.</p>}>
          {(currentRegion) => (
            <>
              <header class="region-header">
                <h1>{params.name}</h1>
                <p>Average Calories: {currentRegion().averageCalories.toFixed(0)}</p>
                <p>Average Fat: {currentRegion().averageFat.toFixed(1)}g</p>
              </header>

              <div class="fish-list">
                <For each={currentRegion().fish}>
                  {(fish) => (
                    <article class="fish-card">
                      <img
                        src={fish['Species Illustration Photo']?.src}
                        alt={fish['Species Illustration Photo']?.alt}
                      />
                      <div class="fish-details">
                        <h2>{fish['Species Name']}</h2>
                        <p class="stats">
                          {fish.Calories} Calories / {fish['Fat, Total']} Fat
                        </p>
                        <p class="description">
                          Taste: {fish.Taste} | Texture: {fish.Texture}
                        </p>
                      </div>
                    </article>
                  )}
                </For>
              </div>
            </>
          )}
        </Show>
      </Show>
    </div>
  );
};
