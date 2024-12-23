const { UserModule } = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlackListToken } = require("../models/blackListModel");

const registerUser = async (req, res) => {
  const { name, email, password, qualification } = req.body;
  try {
    const existingUser = await UserModule.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already in use" });
    }
    bcrypt.hash(password, 8, async (err, hash) => {
      if (err) {
        return res.status(500).send({ message: "Error hashing password", error: err });
      }
      const user = new UserModule({ name, email, password: hash, qualification });
      await user.save();
      return res.status(201).send({ message: "User created successfully!" });
    });
  } catch (error) {
    res.status(500).send({ message: "Error during registration", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModule.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ userId: user._id, authors: user.name }, "masai");
        return res.status(200).send({ message: "Login successful", token: token });
      } else {
        return res.status(400).send({ message: "Invalid email or password" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Error during login", error: error.message });
  }
};

const logoutUser = async (req, res) => {
  const blackListToken = req.headers.authorization?.split(" ")[1];
  try {
    const Token = await BlackListToken.findOne({ blackListToken });
    if (Token) {
      return res.status(403).send({ message: "You are already logged out. Login again" });
    } else {
      const blacklist = new BlackListToken({ blackListToken });
      await blacklist.save();
      return res.status(200).send({ message: "User logout successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
