const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const notificationRoutes = require('./routes/notification');
const boardRoutes = require('./routes/board');
const organizationRoutes = require('./routes/organization');
const organizationRoleRoutes = require('./routes/organizationRole');
const organizationPrerogativeRoutes = require('./routes/organizationPrerogative');
const cardRoutes = require('./routes/card');



const app = express();

mongoose
  .set('useCreateIndex', true)
  .set('useFindAndModify', false)
  .set('useUnifiedTopology', true)
  .connect("mongodb+srv://Bobby:" + "XXFrFPHULs8C7nVM" + "@cluster0-cnita.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => {
      console.log('connected to database');
    })
    .catch(() => {
      console.log('connection failed');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/organization", organizationRoutes);
app.use("/api/organizationRole", organizationRoleRoutes);
app.use("/api/organizationPrerogative", organizationPrerogativeRoutes);
app.use("/api/card", cardRoutes);

module.exports = app;


/** TEST COMMENT */
