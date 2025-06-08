const express = require("express");
const eventsRouter = express.Router();
const {
  getEvents,
  getEventById,
  postEvent,
  deleteEvent,
  getAdminCreatedEvents,
} = require("../controllers/events.controller");

eventsRouter.get("/", getEvents);
eventsRouter.get("/:event_id", getEventById);
eventsRouter.post("/", postEvent);
eventsRouter.delete("/:event_id", deleteEvent);
eventsRouter.get("/:user_id", getAdminCreatedEvents);

module.exports = eventsRouter;
