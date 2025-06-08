const {
  fetchSignups,
  createSignup,
  removeSignup,
  getEventsSignedUpByUser,
} = require("../models/signups.models");

exports.getSignups = (req, res, next) => {
  fetchSignups()
    .then((signups) => {
      res.status(200).send({ signups });
    })
    .catch(next);
};

exports.postSignup = (req, res, next) => {
  createSignup(req.body)
    .then((signup) => {
      res.status(201).send({ signup });
    })
    .catch(next);
};

exports.deleteSignup = (req, res, next) => {
  removeSignup(req.params.signup_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.getUserSignedUpEvents = (req, res, next) => {
  const user_id = req.params.user_id;
  getEventsSignedUpByUser(user_id)
    .then((events) => res.status(200).send({ events }))
    .catch(next);
};
