const {
  fetchEvents,
  fetchEventById,
  createEvent,
  removeEvent,
} = require("../models/events.models");

exports.getEvents = (req, res, next) => {
  fetchEvents()
    .then((events) => {
      res.status(200).send({ events });
    })
    .catch(next);
};

exports.getEventById = (req, res, next) => {
  fetchEventById(req.params.event_id)
    .then((event) => {
      res.status(200).send({ event });
    })
    .catch(next);
};

exports.postEvent = (req, res, next) => {
  createEvent(req.body)
    .then((event) => {
      res.status(201).send({ event });
    })
    .catch(next);
};

exports.deleteEvent = (req, res, next) => {
  removeEvent(req.params.event_id)
    .then(() => res.status(204).send())
    .catch(next);
};
