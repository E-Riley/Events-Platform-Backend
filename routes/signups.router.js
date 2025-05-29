const express = require("express");
const signupsRouter = express.Router();
const {
  getSignups,
  postSignup,
  deleteSignup,
} = require("../controllers/signups.controller");

signupsRouter.get("/", getSignups);
signupsRouter.post("/", postSignup);
signupsRouter.delete("/:signup_id", deleteSignup);

module.exports = signupsRouter;
