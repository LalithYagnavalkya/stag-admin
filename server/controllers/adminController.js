const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const signup = async (req, res) => {
  const { username, password, role } = req.body;
  console.log(username, password);
  console.log(req.body);
  try {
    const existingAdmin = await User.findOne({ username: username });
    if (existingAdmin) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      password: hashedPassword,
      username: username,
      role: role,
      capital: 0,
      joiningDate: moment.now(),
    });

    const token = jwt.sign(
      { username: result.username, id: result._id },
      process.env.JWT_SECRET
    );
    res.status(201).json({ user: result, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const existingAdmin = await User.findOne({ username: username });
    console.log(existingAdmin);
    if (!existingAdmin) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    console.log(matchPassword);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { username: existingAdmin.username, id: existingAdmin._id },
      process.env.JWT_SECRET
    );
    res.status(201).json({ user: existingAdmin, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { signin, signup };
