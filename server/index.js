const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const controller = require('./controller.js');
const cors = require('cors');
const db = require('../database');

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': `http://localhost:${port}`,
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  });
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(cors());

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/events', controller.getEvents);

app.listen(port, () => console.log(`SERVER ON: listening at http://localhost:${port}`));