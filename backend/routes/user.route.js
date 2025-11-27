const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  logUser,
  updatePassword,
  deleteUsers,
} = require("../controllers/user.controller.js");

router.get("/", getUsers);
router.get("/:id", getUser);

router.post("/", createUser);
router.post("/login", logUser);

router.put("/:id", updateUser);
router.put("/password/:id", updatePassword);

router.delete("/all", deleteUsers);
router.delete("/:id", deleteUser);

module.exports = router;
