import type { Component, JSX } from 'solid-js';
import { Route } from '@solidjs/router';
import HomePage from './pages/HomePage';
import { NavBar } from './components/NavBar';
import { RegionPage} from './pages/RegionPage';

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