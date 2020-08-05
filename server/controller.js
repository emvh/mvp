const model = require('./model.js');

const getEvents = (req, res) => {
  model.getEvents((err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports = {
  getEvents,
}
