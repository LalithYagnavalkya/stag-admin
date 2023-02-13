const customerModel = require("../models/customer");
const csvtojson = require("csvtojson");
const csvfilepath = "stag.csv";
const User = require("../models/user");
const moment = require("moment");
const user = require("../models/user");
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

const createCustomer = async (req, res) => {
  const { customer } = req.body;
  const { username, phoneNumber, email, capital, role, returns, joiningDate } =
    customer;
  //jan 28 = feb 28
  //jan 29 = feb 28
  //jan 29 = feb 28
  console.log(req.body.customer);
  try {
    const dueDate = moment(joiningDate).add(1, "month");
    const result = await User.create({
      username: username,
      phoneNumber: phoneNumber,
      capital: capital,
      email: email,
      password: "",
      role: "user",
      returns: returns,
      joiningDate: joiningDate,
      previousDueDate: joiningDate,
      dueDate: dueDate,
      _d: moment(joiningDate).format("DD"),
      numberOfMonthsPaid: 0,
    });
    console.log(result);
    return res.status(200).json({ message: "use created successfully" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "something went wrong", erro: err.message });
  }
};

const getCustomers = (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = req.query.search || 5;
    const search = req.query.search || "";
    const sort = req.query.sort || "due";

    // req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    // req.sort = {};

    // let sortBy = {};
    // if (sort[1]) {
    //   sortBy[sort[0]] = sort[1];
    // } else {
    //   sortBy[sort[0]] = "asc";
    // }
    user.find(
      { role: "user" },
      { username: 1, capital: 1, returns: 1, dueDate: 1 },
      (err, docs) => {
        if (!err) {
          // console.log(docs);
          res.send(docs);
        } else {
          console.log(err);
          // process.exit(1);
          throw err;
        }
      }
    );
    // res.status(200).json()
  } catch (err) {
    console.log(err);
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

const deleteCustomer = (req, res) => {};

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
const updateReturns = (req, res) => {};
const updateCapital = (req, res) => {};

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
};
