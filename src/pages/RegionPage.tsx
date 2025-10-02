import type { Component } from 'solid-js';
import { createMemo, createResource, For, Show, createSignal } from 'solid-js';
import { useParams } from '@solidjs/router';
import { fetchFishData, processFishData } from '../services/fishData';
import { Modal } from '../components/Modal';

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
    const name = decodeURIComponent(params.name);
    
    if (!data || !name) return null;

    return data[name];
  });

  const [selectedFish, setSelectedFish] = createSignal<any>(null);

  const openModal = (fish: any) => setSelectedFish(fish);
  const closeModal = () => setSelectedFish(null);

  return (
    <div class="region-page">
      <Show when={!processedData.loading} fallback={<p>Loading region data...</p>}>
        <Show when={regionData()} fallback={<p>Region not found.</p>}>
          {(currentRegion) => (
            <>
              <header class="region-header">
                <h1>{decodeURIComponent(params.name)}</h1>
                <p>Average Calories: <strong>{currentRegion().averageCalories.toFixed(0) + ' calories' || 'N/A'}</strong></p>
                <p>Average Fat: <strong>{currentRegion().averageFat.toFixed(1) + ' grams' || 'N/A'}</strong></p>
              </header>

              <div class="fish-list">
                <For each={currentRegion().fish}>
                  {(fish) => (
                    <article class="fish-card" onClick={() => openModal(fish)} title="Click to view more details">
                      <img
                        src={fish?.SpeciesIllustrationPhoto.src}
                        alt={fish?.SpeciesIllustrationPhoto.alt}
                      />
                      <div class="fish-details">
                        <h2>{fish?.SpeciesName}</h2>
                        <p class="stats">
                          {fish.Calories || 'N/A'} Calories / {fish.FatTotal || 'N/A'} Fat
                        </p>
                        <p class="description">
                          <strong><u>Taste</u></strong>
                          <em innerHTML={fish.Taste || '<p>N/A</p>'}></em>
                          <br />
                          <strong><u>Texture</u></strong>
                          <em innerHTML={fish.Texture || '<p>N/A</p>'}></em>
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
      <Show when={selectedFish()}> 
        <Modal fish={selectedFish()} onClose={closeModal} />
      </Show>
    </div>
  );
};
