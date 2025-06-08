const express = require("express");
const usersRouter = express.Router();
const { getUsers, postUser } = require("../controllers/users.controller");
const { getUserSignedUpEvents } = require("../controllers/signups.controller");

usersRouter.get("/", getUsers);
usersRouter.post("/", postUser);
usersRouter.get("/:user_id/events", getUserSignedUpEvents);

module.exports = usersRouter;
