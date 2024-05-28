require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const tasksRoutes = require("./routes/tasks");
const subTaskRoutes = require("./routes/subTasks");
const binRoutes = require("./routes/bin");
const userRoutes = require("./routes/user");

const app = express();

const corsOptions = { origin: process.env.CORS_ORIGIN };

// middleware
app.use(express.json());
app.use(cors(corsOptions));

// routes
app.use("/api/tasks", tasksRoutes);
app.use("/api/subTasks", subTaskRoutes);
app.use("/api/bin", binRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");

    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("port active");
    });
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });
