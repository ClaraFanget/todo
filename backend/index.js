const express = require("express");
const mongoose = require("mongoose");
const user = require("./Model/user.model.js");
const userRoute = require("./routes/user.route.js");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/users", userRoute);
app.get("/", (req, res) => {
  res.send("Welcome ont the practice 2 API");
});

mongoose
  .connect(
    "mongodb+srv://cfanget_db_user:${process.env.DB_PASSWORD}@todo.nrsliwr.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, "0.0.0.0", () => console.log("Sever Started"));
  })
  .catch(() => {
    console.log("Connection failed!");
  });
