import React, {useState, useEffect} from 'react';
// const flower = require('../assets/images/flower.jpg');
import {Link} from '@reach/router';

function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mono">
      <h1>Hi!</h1>
      <h2>A React SSR web app.</h2>
      <p>Count {count}</p>
      {/* <p>A red flower:</p>
      <img src={flower} /> */}
      {/* // image es6 import is not working with rendertostring in node. might need changes in webpack config */}
      <Link to="about">About</Link>
    </div>
  );
}

export default Home;
