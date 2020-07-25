const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
// const controller = require('./controller.js');

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/api/puppies', controller.getPuppies);

// app.patch('/api/puppies', controller.updatePuppies);

app.listen(port, () => console.log(`SERVER ON: listening at http://localhost:${port}`));