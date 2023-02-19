const customerModel = require("../models/customer");
const csvtojson = require("csvtojson");
const csvfilepath = "stag.csv";
const User = require("../models/user");
const moment = require("moment");
const user = require("../models/user");
const ClientReqs = require("../models/ClientsInfo");
const jwt = require('jsonwebtoken')
const twilio = require('twilio');
const generateOTP = (otp_length) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
// console.log(moment.now());
// console.log(moment(1675148359000).add(2, "month").format("DD MM YYYY"));
// console.log(moment("2023-01-15T18:30:00.000Z").format("DD MM YYY"));
// console.log(moment("2023-01-15T18:30:00.000Z").format("DD"));

//fucntion to add feilds in all docs
// user.find({}, (err, docs) => {
//   docs.map(async (doc) => {
//     await user.findByIdAndUpdate(
//       { _id: doc._id },
//       { isDue: false, _d: moment(doc.joiningDate).format("DD") }
//     );
//   });
// });
const loginCustomer = async (req, res) => {
  try {
    const { mobileNumber } = req.body
    const foundMobileNumber = await User.findOne({ phoneNumber: mobileNumber });
    if (!foundMobileNumber) {
      res.status(404).json({ message: "phone number not found" })
      return;
    }
    const otp = generateOTP(6)
    const message = `Your OTP is ${otp}`
    foundMobileNumber.phoneOtp = otp;
    await foundMobileNumber.save();
    const client = new twilio(process.env.ACCOUTN_SID, process.env.AUTH_TOKEN)
    client.messages.create({
      body: message,
      to: foundMobileNumber.phoneNumber,
      from: '+12532451940'
    }).then(resp =>
      res.status(201).json({
        message: "OTP sended to your registered phone number",
        data: {
          userId: foundMobileNumber._id
        }
      })
    ).catch(err => {
      console.log(err)
      res.status(500).json({ message: "something went wrong", err })

    });
  } catch (error) {
    console.log(error)
  }
}
const verifyPhoneOtp = async (req, res) => {
  try {
    const { otp, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      next({ status: 400, message: "User Not Found" });
      return;
    }

    if (user.phoneOtp !== otp) {
      next({ status: 400, message: "Incorrect Otp" });
      return;
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1m" });

    user.phoneOtp = "";
    await user.save();

    res.status(201).json({
      type: "success",
      message: "OTP verified successfully",
      data: {
        token,
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
}
const createCustomer = async (req, res) => {
  const { id, returns, capital } = req.body;
  try {
    // const dueDate = moment(joiningDate).add(1, "month");
    const clientData = await ClientReqs.findOne({ _id: id })
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
    });
    console.log("CLIENT_REQ", name);
    return res.status(200).json({ message: "use created successfully" });
  } catch (err) {
    // console.log(err.message);
    return res
      .status(500)
      .json({ message: "something went wrong", erro: err.message });
  }
};

const getCustomers = (req, res) => {
  try {
    const { query, filter } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = 20;

    let isDue;
    if (filter === 'paidUser') {
      isDue = false;
    } else if (filter === 'due') {
      isDue = true;
    } else if (filter === 'all') {
      isDue = { $exists: true };
    } else {
      // Handle case where filter is invalid or not provided
      res.status(400).json({ error: 'Invalid filter' });
      return;
    }

    const foundQuery = user.find(
      { role: 'user', username: new RegExp(query, 'i'), isDue },
      { username: 1, capital: 1, returns: 1, dueDate: 1 },
      (err, docs) => {
        if (!err) {
          console.log(docs);
          res.status(200).json(docs);
        } else {
          console.log(err);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    ).skip((page - 1) * limit).limit(limit);
    res.status(200).json(foundQuery)
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
  console.log(req.body);
  res.send("hello");
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

const exportUsers = async (req, res) => {
  csvtojson()
    .fromFile(csvfilepath)
    .then((json) => {
      // console.log(json);
      Customer.insertMany(json);
    })
    .then(() => {
      console.log("data inserted");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  createCustomer,
  closeDueDate,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateReturns,
  updateCapital,
  exportUsers,
  getClinetReqs,
  verifyPhoneOtp,
  loginCustomer
};
