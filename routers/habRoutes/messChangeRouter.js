const express = require("express");
const {
  messResponseChange,
} = require("../../controllers/habControllers/messChangeController");
const {
  verifyUserRequest,
  restrictIfGuest,
} = require("../../middlewares/user.auth");
const messRouter = express.Router();

messRouter.post(
  "/mess/messChange",
  verifyUserRequest,
   restrictIfGuest,
  messResponseChange
);

module.exports = { messRouter };
