const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/events', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DATABASE Connected!');
});

const categorySchemaType = {
  name: String,
  id: String,
};

const eventSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: String,
  venue: String,
  venue_display: String,
  venue_address: String,
  city: String,
  state: String,
  state_abbr: String,
  zip_code: String,
  country: String,
  longitude: String,
  latitude: String,
  url: String,
  start_time: String,
  stop_time: String,
  description: String,
  owner: String,
  categories: [`${categorySchemaType}`],
  image: String,
});

const Event = mongoose.model('event', eventSchema);

module.exports = {
  db,
  Event,
};
