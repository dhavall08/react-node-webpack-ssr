import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';

const wrapper = document.getElementById('root');
wrapper ? ReactDOM.hydrate(<App />, wrapper) : false;
