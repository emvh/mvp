const db = require('../database');

const getEvents = (callback) => {
  db.Event.find(callback);
};

module.exports = {
  getEvents,
}