const axios = require('axios');
const db = require('./index.js');

const clearEvents = () => {
  db.Event.deleteMany({})
    .then(() => {
      console.log('SUCCESS: cleared existing events data');
    })
    .catch((error) => console.log('FAILED clearing events:', error));
};
clearEvents();

const getEvents = () => {
  const app_key = '5CL2SvxkV8SrmBCQ';
  axios({
    method: 'get',
    url: 'http://api.eventful.com/json/events/search',
    params: {
      app_key,
      c: 'animals,other',
      q: 'dog',
      include: 'categories',
      ex_category: 'music,sports,comedy',
      location: 'United States',
      image_sizes: 'large',
      page_size: 150,
    },
  })
    .then((response) => {
      const data = extractEventData(response.data.events.event);
      insertEventData(data);
    })
    .catch((error) => console.log('ERROR:', error));
}

const extractEventData = (arr) => {
  const dataSet = [];
  for (let i = 0; i < 100; i++) {
    const event = {
      id: i + 1,
      title: arr[i].title,
      price: arr[i].price,
      venue: arr[i].venue_name,
      venue_display: arr[i].venue_display,
      venue_address: arr[i].venue_address,
      city: arr[i].city_name,
      state: arr[i].region_name,
      state_abbr: arr[i].region_abbr,
      zip_code: arr[i].postal_code,
      country: arr[i].country_name,
      longitude: arr[i].longitude,
      latitude: arr[i].latitude,
      url: arr[i].url,
      start_time: arr[i].start_time,
      stop_time: arr[i].stop_time,
      description: arr[i].description,
      owner: arr[i].owner,
      category: arr[i].categories.category,
      image: 'http://placecorgi.com/260',
    };
    dataSet.push(event);
  }
  return dataSet;
};

const data = getEvents();

const insertEventData = (data) => {
  db.Event.insertMany(data)
    .then(() => {
      console.log('Inserted event data');
      db.db.close();
    })
    .catch((error) => console.log(error));
};
