const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;
const uploadRoute = require("./api/routes/upload");
const loginRoute = require("./api/routes/login");
const activityRoute = require("./api/routes/activity");
const apiError = require("./api/errorHandler/apiErrors");
const apiErrorHandler = require("./api/errorHandler/apiErrorHandler");

mongoose.connect(`${process.env.MONGO_URI}`, () => {
  console.log("connected to db");
});
app.all("*", (req, res, next) => {
  // CORS headers
  //use * to allow all or can set http://localhost:3000 for testing
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/upload", uploadRoute);
app.use("/auth", loginRoute);
app.use("/activity", activityRoute);

app.use((req, res, next) => {
  next(apiError.notFound("Route not Found"));
});

app.use(apiErrorHandler);

app.listen(port, () => {
  console.log(`server started on =  http://localhost:${port}`);
});
