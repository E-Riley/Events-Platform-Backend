const data = require("./data/index");
const seed = require("./seed");

const db = require("./connection");

seed(data).then(() => db.end());
