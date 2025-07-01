require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

// import models (nếu cần initialize schema)
require("./models/members");
require("./models/players");
require("./models/teams");

// import routes
const playerRouter = require("./routes/playerRoute");
const teamRouter = require("./routes/teamRoute");
const authRouter = require("./routes/authRoute");
const memberRouter = require("./routes/memberRoute");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// use routes
app.use("/players", playerRouter);
app.use("/teams", teamRouter);
app.use("/auth", authRouter);
app.use("/member", memberRouter);
// db connect
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connect OK!"))
  .catch((err) => console.log("Connect Fail:", err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
