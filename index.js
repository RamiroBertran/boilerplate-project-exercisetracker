require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URI;
const url = require("url");
const dns = require("dns");
const bodyParser = require("body-parser");
const addOneUsername = require("./playground-1.mongodb");

app.use(cors());
const usernameSchema = mongoose.Schema({
  username: String,
});
const addExcersiseSchema = mongoose.Schema({
  id: String,
  description: String,
  duration: String,
  date: String,
});

const usernameModel = mongoose.Model("usernameModel", usernameSchema);
const addExcersiseModel = mongoose.Model(
  "addExcersiseModel",
  addExcersiseSchema
);

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(typeof mongoURL);
    console.error("Error: " + error);
  });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/users", (req, res) => {
  let username = req.body.username;
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
