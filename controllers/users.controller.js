const { fetchUsers, createUser } = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => res.status(200).send({ users }))
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const { email, password, name, role = "user" } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send({ msg: "Missing required fields" });
  }
  createUser({ email, password, name, role })
    .then((user) => {
      delete user.password_hash;
      return res.status(201).send({ user });
    })
    .catch(next);
};
