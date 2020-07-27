const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const controller = require('./controller.js');
const cors = require('cors');
const db = require('../database');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  next();
});

// app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// app.options('*', cors());
app.options('*', function (req,res) { res.sendStatus(200); });
// app.get('/with-cors', cors(), (req, res, next) => {
//   res.json({ msg: 'WHOAH with CORS it works! 🔝 🎉' })
// })

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/events', controller.getEvents);

app.listen(port, () => console.log(`SERVER ON: listening at http://localhost:${port}`));