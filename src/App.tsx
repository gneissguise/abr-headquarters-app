import type { Component, JSX } from 'solid-js';
import { Route } from '@solidjs/router';
import HomePage from './pages/HomePage';
import { NavBar } from './components/NavBar';
import { RegionPage} from './pages/RegionPage';

/**
 * @description A reusable layout component that provides a consistent structure for all pages.
 * It includes the navigation bar and a main content area for page-specific content.
 * @param props The properties passed to the component, including the children to render.
 * @returns The main application layout structure.
 */
const AppLayout = (props: { children: JSX.Element }) => {
  return (
    <>
      <NavBar />
      <main>
        {props.children}
      </main>
    </>
  );
};

const App: Component = () => {
  return (
    <Route path="/" component={AppLayout}>
      <Route path="" component={HomePage} />
      <Route path="region/:name" component={RegionPage} />
    </Route>
  );
};

export default App;