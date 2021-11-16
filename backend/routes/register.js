const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { urlencoded } = require("express");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
let router = express.Router();

router.use(cors());
router.use(urlencoded({ extended: false }));
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  console.log(res.body);
  res.send("It worked!");
});

router.post("/register", async (req, res) => {
  let { username, email, password } = req.body;
  console.log(req.body);
  try {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        User.create({
          username,
          email,
          password: hash,
        }).then((result) => res.send(result));
      }
    });
  } catch (error) {
    console.log("Err", error);
  }
});

module.exports = router;
