const express = require("express");
const usersRouter = require("./users.router");
const eventsRouter = require("./events.router");
const signupsRouter = require("./signups.router");
const { getEndpoints } = require("../controllers/api.controller");

const apiRouter = express.Router();
apiRouter.get("/", getEndpoints);
apiRouter.use("/users", usersRouter);
apiRouter.use("/events", eventsRouter);
apiRouter.use("/signups", signupsRouter);

module.exports = apiRouter;
