import React from 'react';
import express from 'express';
import path from 'path';
import fs from 'fs';
import {renderToString} from 'react-dom/server';
import App from '../src/pages/App/';
import { ServerLocation } from '@reach/router';
const app = express();

app.use(
  '/assets',
  express.static(path.resolve(__dirname, '..', 'dist', 'assets'))
);

app.use('/dist', express.static(path.resolve(__dirname, '..', 'dist')));

// hide powered by express
app.disable('x-powered-by');

// start the server
app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log('Error!', err);
  }
  console.log('Server is listening.');
});

app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  const renderedApp = renderToString(
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );
  const filePath = path.resolve(__dirname, '..', 'dist', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    data = data.replace(/__CONTENT___/g, renderedApp);
    res.send(data);
  });
});
