import { Component } from 'solid-js';
import { A } from '@solidjs/router';

const NavBar: Component = () => {
  return (
    <nav class="main-nav">
      <A href="/">Home</A>
      {/* We will add dynamic region links here later */}
    </nav>
  );
};

export default NavBar;
