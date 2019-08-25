const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const request = require('request');

// Bind heroku port from environment variables or assign the port number 4200 when tested on a different environment.
dotenv.config();
const port = process.env.PORT||4200;

// Create an express server.
const app = express();

app.use(cors());

// Creates a proxy to user jira board
const proxy = (req, res) => {
  const host = req.headers.proxyhost;
  // req.headers.origin = host;
  // req.headers.Origin = host;
  const path = `/rest${req.originalUrl.split('/api/rest')[1]}`;
  const proxyPath = `${host}${path}`;
  const proxyRequest = request({
    url: proxyPath
  }, (error) => {
    if (error)res.status(500).json({ error: error.message});
  });
  req.pipe(proxyRequest);
  proxyRequest.pipe(res);
};

// Redirects all urls with an api prefix to avoid cross origin errors
app.use('/api/*', proxy);


// run the server
app.listen(port, () => console.log(`listening on port ${port}`));
