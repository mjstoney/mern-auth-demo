const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { urlencoded } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
let router = express.Router();

router.use(cors());
router.use(urlencoded({ extended: false }));

router.use((req, res, next) => {
  console.log("Login time: ", Date.now());
  next();
});

// Verify user credentials and sign JWT -> httponly cookie
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let userID = null;
  try {
    let foundUser = await User.findOne({ username });
    console.log(foundUser);
    if (foundUser) {
      userID = foundUser._id;
      let authenticated = await bcrypt.compare(password, foundUser.password);
      if (authenticated) {
        let token = jwt.sign({ userID: userID }, process.env.JWT_SECRET);
        res.cookie("secureCookie", JSON.stringify(token), {
          secure: process.env.NODE_ENV !== "development",
          httpOnly: true,
        });
        res.send(authenticated);
      } else {
        console.log("wrong pw");
        res.status(401).send("Not authenticated.");
      }
    } else {
      console.log("User not found.");
      res.status(401).send("User not found.");
    }
  } catch (error) {
    res.send("Login error:" + error);
  }
});

module.exports = router;
