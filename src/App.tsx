import { Component } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
// We'll create RegionPage in the next step
// import RegionPage from './pages/RegionPage';

const App: Component = () => {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" component={HomePage} />
          {/* Example route for the detail page, we'll build this next */}
          {/* <Route path="/region/:name" component={RegionPage} /> */}
        </Routes>
      </main>
    </>
  );
};

export default App;
