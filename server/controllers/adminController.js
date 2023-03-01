const User = require("../models/user.js");
const ClientReqs = require("../models/ClientsInfo");

const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
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

const createCustomer = async (req, res) => {
  const { id, returns, capital } = req.body;
  console.log(req.body);
  try {
    // const dueDate = moment(joiningDate).add(1, "month");
    const clientData = await ClientReqs.findOne({ _id: id });
    const { name, phone, bankaccount, ifsc, branch, photo } = clientData;
    const result = await User.create({
      username: name,
      phoneNumber: phone,
      capital: capital,
      email: "",
      password: "",
      role: "user",
      returns: returns,
      bankaccount,
      ifsc,
      branch,
      profilePic: photo,
      numberOfMonthsPaid: 0,
    }).then(async () => {
      await ClientReqs.findByIdAndDelete({ _id: id });
    });
    console.log("CLIENT_REQ created successfully", name);

    return res
      .status(200)
      .json({ message: "use created successfully", _id: id });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "something went wrong", err: err.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    const { query, filter } = req.body;
    console.log(query)
    let isDue;
    if (filter === "paidUser") {
      isDue = false;
    } else if (filter === "due") {
      isDue = true;
    } else if (filter === "all") {
      isDue = { $exists: true };
    } else {
      // Handle case where filter is invalid or not provided
      res.status(400).json({ error: "Invalid filter" });
      return;
    }

    console.log("req");
    const foundQuery = await User.find(
      { role: "user", username: new RegExp(query, "i"), isDue },
      { username: 1, capital: 1, returns: 1, dueDate: 1 }
    )
    res.status(200).json(foundQuery);
  } catch (err) {
    console.log(err);
  }
};
const getClinetReqs = (req, res) => {
  try {
    ClientReqs.find({}, (err, docs) => {
      if (!err) {
        res.status(200).json(docs);
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", erro: err.message });
  }
};
const deleteClinetReq = async (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  try {
    const result = await ClientReqs.findByIdAndDelete({ _id: _id });
    console.log(result);
    return res.status(200).json({ message: "deleted", _id: _id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const closeDueDate = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await User.findByIdAndUpdate({ _id: id }, { isDue: false });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateCustomer = (req, res) => {
  const { data, id } = req.body;
  console.log(data)
  const updateData = {};
  for (const [key, value] of Object.entries(data)) {
    if (key === 'returns') {
      if (Array.isArray(value) && value.length) {
        updateData[key] = value;
      }
    } else if (key === 'totalReturns') {
    }
    else if (value !== '') {
      updateData[key] = value;
    }
  }
  console.log(data.totalReturns.length);
  // Check if updateData contains any keys
  if (Object.keys(updateData).length || data.totalReturns.length) {
    User.findByIdAndUpdate(
      id,
      { $inc: { totalReturns: data.totalReturns }, ...updateData }, // add $inc operator here
      { new: true, omitUndefined: true },
      (err, updatedDoc) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "failed to update" });
        } else {
          console.log(updatedDoc);
          res.status(200).json({ message: "successfully updated" })
        }
      }
    );
  } else {
    // updateData is empty, do not make the update
    console.log('No data to update');
  }
};

const deleteCustomer = (req, res) => { };

const getCustomer = (req, res) => {
  const { id } = req.body;
  console.log(req.body);

  console.log("get customer triggered");
  try {
    User.findById({ _id: id }, { password: 0 }, (err, docs) => {
      if (!err) {
        console.log(docs);
        res.send(docs);
      } else {
        console.log(err);
        throw err;
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.mess });
  }
};
const updateReturns = (req, res) => { };
const updateCapital = (req, res) => { };

module.exports = {
  signin,
  signup,
  createCustomer,
  closeDueDate,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateReturns,
  updateCapital,
  getClinetReqs,
  deleteClinetReq,
};
