require("dotenv").config();
const mongoURL = process.env.MONGO_URI;
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// Create new username variables
let id;
let username;

app.use(cors());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
// --- Connect to mongodatabase ----
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    createCollection();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

async function createCollection() {
  try {
    const usernameSchema = new mongoose.Schema({
      username: String,
    });
    const exerciseSchema = new mongoose.Schema({
      id: String,
      username: String,
      date: String,
      duration: String,
      description: String,
    });

    Username = mongoose.model("Username", usernameSchema);
    Exercise = mongoose.model("Exercise", exerciseSchema);

    await Username.createCollection();
    await Exercise.createCollection();
    console.log("user collection created");
  } catch (error) {
    console.error("Error:" + error);
  }
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.post("/api/users", (req, res) => {
  username = req.body.username;
  const newUser = new Username({
    username: username,
  });
  newUser
    .save()
    .then((result) => {
      id = result._id;
      username = result.username;
      res.json({ username: username, _id: id });
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/api/users/:id/exercises", (req, res) => {
  let d = new Date(req.body.date);
  let d_long = d.toLocaleDateString;
  console.log(d_long);
  const newExercise = new Exercise({
    id: req.params.id,
    username: username,
    date: req.body.date,
    duration: req.body.duration,
    description: req.body.description,
  })
    .save()
    .then((result) => {
      console.log("Successfully saved");
      let date = new Date(result.date);
      res.json({
        _id: result._id,
        username: result.username,
        date: date,
        duration: result.duration,
        description: result.description,
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

// --- litener app that input to console port in which the app is  connected ----
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
