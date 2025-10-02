import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { createEffect, createResource, For } from 'solid-js';
import { fetchFishData, processFishData } from '../services/fishData';

export const NavBar: Component = () => {
  // Using createResource here for async reactivity
  const [processedData] = createResource(async () => {
    const rawData = await fetchFishData();
    return processFishData(rawData);
  });

  createEffect(() => {
    console.log("Processed Data:", processedData());
  });

  return (
    <nav class="main-nav">
      <A href="/" class="nav-link">Home</A>
      <For each={Object.keys(processedData() || {})}>
        {(region) => (
          <A href={`/region/${encodeURIComponent(region)}`} class="nav-link">
            {region}
          </A>
        )}
      </For>
    </nav>
  );
};
