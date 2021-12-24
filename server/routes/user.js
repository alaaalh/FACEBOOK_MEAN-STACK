const router = require("express").Router();
const User = require("../models/user");
require("express-async-errors");
const validInputs = require("../middlewares/validInputs");
const checkInformation = require("../middlewares/checkInformation");

router.post(
  "/register",
  validInputs(["name", "email", "password", "gender"]),
  async (req, res) => {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateToken();
    const newUser = user.filterResponse();
    const msg = "User registerd successfully :)";
    res.send({ user: newUser, token, msg });
  }
);

router.post(
  "/login",
  [validInputs(["email", "password"]), checkInformation],
  async (req, res) => {
    const token = await req.user.generateToken();
    const newUser = req.user.filterResponse();
    const msg = "User logged successfully :)";
    res.send({user: newUser, token, msg});
  }
);

module.exports = router; 
