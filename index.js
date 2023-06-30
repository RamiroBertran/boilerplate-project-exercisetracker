require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URI;
const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

const usernameSchema = mongoose.Schema({
  username: String,
});
const addExcersiseSchema = mongoose.Schema({
  id: String,
  description: String,
  duration: String,
  date: String,
});

const usernameModel = mongoose.model("usernameModel", usernameSchema);
const addExcersiseModel = mongoose.model(
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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", (req, res) => {
  let username = req.body.username;
  const newUser = new usernameModel({ username: username });
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to save user" });
    });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
