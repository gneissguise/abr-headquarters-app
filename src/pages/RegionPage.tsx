import type { Component } from 'solid-js';
import { createMemo, For, Show, createSignal } from 'solid-js';
import { useParams } from '@solidjs/router';
import { processedData } from '../data/appData'; // Import the shared resource
import { Modal } from '../components/Modal';
import type { Fish } from '../types'; // Import the Fish type

/**
 * @description A page that displays detailed information about a specific region, including a list of fish found in that region.
 * @returns The region page component.
 */
export const RegionPage: Component = () => {
  const params = useParams();

  // Create a memoized signal for the current region's data
  const regionData = createMemo(() => {
    const data = processedData();
    const name = decodeURIComponent(params.name);
    if (!data || !name) return null;
    return data[name];
  });

  const [selectedFish, setSelectedFish] = createSignal<Fish | null>(null);

  const openModal = (fish: Fish) => setSelectedFish(fish);
  const closeModal = () => setSelectedFish(null);

  return (
    <div class="region-page">
      <Show when={!processedData.loading} fallback={<p class="loading-indicator">Loading region data...</p>}>
        <Show when={regionData()} fallback={<p>Region not found.</p>}>
          {(currentRegion) => (
            <>
              <header class="region-header">
                <h1>{decodeURIComponent(params.name)}</h1>
                <p>Average Calories: <strong>{currentRegion().averageCalories.toFixed(0)} calories</strong></p>
                <p>Average Fat: <strong>{currentRegion().averageFat.toFixed(1)} grams</strong></p>
              </header>

              <div class="fish-list">
                <For each={currentRegion().fish}>
                  {(fish) => (
                    <article class="fish-card" onClick={() => openModal(fish)} title="Click to view more details">
                      <Show when={fish['Species Illustration Photo']?.src}>
                        <img
                          src={fish['Species Illustration Photo'].src}
                          alt={fish['Species Illustration Photo'].alt}
                        />
                      </Show>
                      <div class="fish-details">
                        <h2>{fish['Species Name']}</h2>
                        <p class="stats">
                          {fish.Calories || 'N/A'} Calories / {fish['Fat, Total'] || 'N/A'} Fat
                        </p>
                        <div class="description">
                          <strong><u>Taste</u></strong>
                          <em innerHTML={fish.Taste || '<p>N/A</p>'}></em>
                          <br />
                          <strong><u>Texture</u></strong>
                          <em innerHTML={fish.Texture || '<p>N/A</p>'}></em>
                        </div>
                      </div>
                    </article>
                  )}
                </For>
              </div>
            </>
          )}
        </Show>
      </Show>
      <Show when={selectedFish()}> 
        {(fish) => <Modal fish={fish()} onClose={closeModal} />}
      </Show>
    </div>
  );
};
