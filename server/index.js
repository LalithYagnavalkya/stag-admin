const app = require("./app.js");
const { config } = require("dotenv");
const connectDatabase = require("./config/database.js");
const cron = require("node-cron");
const User = require("./models/user.js");
const moment = require("moment");
config({
  path: "./config/config.env",
});
connectDatabase();
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
// const today = moment().format("DD");
// console.log(moment("30 01 2023").add("1", "month").format("DD  MM YYYY"));

// User.find({ _d: "30" }, (err, docs) => {
//   console.log(docs);
//   docs.map(async (doc) => {
//     const newDueDate = moment(doc.dueDate)
//       .add("1", "month")
//       .format("DD MM YYYY");
//     console.log(newDueDate);

//     const result = await User.findOneAndUpdate(
//       { _id: doc._id },
//       { isDue: true, previousDueDate: doc.dueDate, dueDate: newDueDate }
//     );
//     console.log(result);
//   });
// });
// Schedule tasks to be run on the server.
cron.schedule("0 0 1 * *", function () {
  User.updateMany({}, { isDue: true }, function (err, result) {
    if (err) {
      console.log("Error updating users:", err);
    } else {
      console.log("Number of users updated:", result);
    }
  });
  console.log("running a task every month");
});

