const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const auth = require("./middleware/auth");

const mongoURI = "mongodb://localhost:27017/auth";
const PORT = 5000;
mongoose
  .connect(mongoURI)
  .then(() => console.log("database connected."))
  .catch((err) => console.log(err));

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// MODELS

// ROUTES backend/routes
const routes = require("./routes/register");
const login = require("./routes/login");
app.use("/", routes);
app.use("/", login);

app.get("/dashboard", (req, res) => {
  console.log(req.body);
  res.send("You navigated to the dashboard!");
});

// SERVER START
app.listen(PORT, () => console.log("server running..."));
