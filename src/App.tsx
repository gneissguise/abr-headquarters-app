import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import { RegionPage} from './pages/RegionPage';

const App: Component = () => {
  return (
    <>
      <NavBar />
      <main>
        <Router>
          <Route path="/" component={HomePage} />
          <Route path="/region/:name" component={RegionPage} />
        </Router>
      </main>
    </>
  );
};

export default App;