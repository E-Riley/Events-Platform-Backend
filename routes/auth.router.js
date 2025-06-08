const express = require("express");
const { loginUser } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/", loginUser);

module.exports = authRouter;
