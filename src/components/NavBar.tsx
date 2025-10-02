import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { For, Show } from 'solid-js';
import { processedData } from '../data/appData';

/**
 * @description A navigation bar that dynamically generates links based on the available regions.
 * It uses a shared resource to get the data, and handles loading and error states.
 * @returns The main navigation bar component.
 */
export const NavBar: Component = () => {
  return (
    <nav class="main-nav">
      <A href="/" class="nav-link">Home</A>
      <Show when={!processedData.loading} fallback={<span class="nav-link">Loading regions...</span>}>
        <For each={Object.keys(processedData() || {})}>
          {(region) => (
            <A href={`/region/${encodeURIComponent(region)}`} class="nav-link">
              {region}
            </A>
          )}
        </For>
      </Show>
    </nav>
  );
};
