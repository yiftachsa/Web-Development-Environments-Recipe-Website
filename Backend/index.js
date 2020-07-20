require("dotenv").config();
//#region express configures
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require('body-parser');
const session = require("client-sessions");
const cors = require("cors");

const DButils = require("./modules/DButils");
const auth = require("./routes/auth");
const user = require("./routes/user");
const recipes = require("./routes/recipes");

var app = express();
var port = process.env.PORT || "3000";

app.use(logger("dev")); //logger

const corsConfig = {
  origin: true,
  credentials: true
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(express.json()); // parse application/json
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 20 * 60 * 1000, // expired after 20 sec
    activeDuration: 0, // if expiresIn < activeDuration,
    //the session will be extended by activeDuration milliseconds
    cookie: {
      httpOnly: false,
    }
  })
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

//#endregion

app.get("/alive", (req, res) => {
  res.send("The server is running");
});

app.get("/", (req, res) => res.send("welcome"));

app.use("/user", user);
app.use("/recipes", recipes);
app.use(auth);

//Final router - not found
app.use(function (err, req, res, next) {
  console.error(err);
  if (err.status != undefined && err.response!= undefined) {
    res.status(err.status || err.response.status || 500).send({ message: err.message, success: false });
  }
  else if(err.status != undefined) {
    res.status( err.status || 500).send({ message: err.message, success: false });
  }
  else if(err.response != undefined) {
    res.status( err.response.status || 500).send({ message: err.message, success: false });
  }
  else{
    res.status(500).send({ message: err.message, success: false });
  }
});

const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});
