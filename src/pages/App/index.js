import React from 'react';
import {Router} from '@reach/router';
import Home from '../Home';
import About from '../About';
import('./App.css'); // need changes, causes error in server file line:6
// import without parenthesis doesn't work

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Home path="/" />
        <About path="/about" />
      </Router>
    </React.StrictMode>
  );
}

export default App;
