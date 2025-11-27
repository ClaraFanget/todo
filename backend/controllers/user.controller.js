const { get } = require("mongoose");
const User = require("../models/user.model.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: "success",
      message: "Users successfully retrieved",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Ajouter un cas pour user not found
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({
      status: "success",
      message: "User successfully retrieved",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      message: "User successfully created",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const logUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        status: "fail",
        message: "Password incorrect",
      });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      message: "Successfully connected",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json({
      status: "success",
      message: "User successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { new_password, password } = req.body;
    const user = await User.findByIdAndUpdate(id, { password: new_password });
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    if (user.password != password) {
      return res
        .status(400)
        .json({ status: "fail", message: "Current password incorrect" });
    }
    const updatedUser = await User.findById(id);
    const updatedPassword = updatedUser.password;

    res.status(200).json({
      status: "success",
      message: "Password successfully updated",
      data: updatedPassword,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const users_suppression = await User.deleteMany({});
    if (!users_suppression) {
      return res
        .status(404)
        .json({ status: "fail", message: "No user in the database" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Users successfully deleted" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  logUser,
  updatePassword,
  deleteUsers,
};
