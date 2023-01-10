const adminModel = require("../models/admin.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingAdmin = await adminModel.findOne({ username: username });
    if (existingAdmin) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await adminModel.create({
      password: hashedPassword,
      username: username,
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

const singin = (req, res) => {};
module.exports = { singin, signup };
