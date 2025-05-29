const { fetchUsers, createUser } = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => res.status(200).send({ users }))
    .catch(next);
};

exports.postUser = (req, res, next) => {
  createUser(req.body)
    .then((user) => res.status(201).send({ user }))
    .catch(next);
};
