const express = require("express");
const mongoose = require("mongoose");
const user = require("./models/user.model.js");
const userRoute = require("./routes/user.route.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const authenticateToken = require("./middleware.auth.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/users", userRoute);
app.get("/", (req, res) => {
  res.send("Welcome on the todo lists API");
});

mongoose
  .connect(
    `mongodb+srv://cfanget_db_user:${process.env.DB_PASSWORD}@todo.nrsliwr.mongodb.net/?appName=todo`
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, "0.0.0.0", () =>
      console.log("Sever Started at http://localhost:3000")
    );
  })
  .catch((error) => {
    console.log(error);
    console.log("Connection failed!");
  });
