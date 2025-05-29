const express = require("express");
const usersRouter = express.Router();
const { getUsers, postUser } = require("../controllers/users.controller");

usersRouter.get("/", getUsers);
usersRouter.post("/", postUser);

module.exports = usersRouter;
