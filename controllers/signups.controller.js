const {
  fetchSignups,
  createSignup,
  removeSignup,
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
