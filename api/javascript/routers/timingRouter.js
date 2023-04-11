const express = require("express");

const timingRouter = express.Router();
const Controller = require("../controllers/timingController");

timingRouter.get("/ferrytimings", Controller.getferrytiming);

timingRouter.get("/busStops", Controller.getbusStop);

module.exports = { timingRouter };
