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

//function to update due customers everyday.

// var bulkOp = User.initializeOrderedBulkOp();
// var count = 0;
// collection.find().forEach(function (doc) {
//   bulkOp.find({ _id: doc._id }).updateOne({
//     $set: { time: new Date(doc.time) },
//   });
//   count++;
//   if (count % 100 === 0) {
//     // Execute per 100 operations and re-init
//     bulkOp.execute();
//     bulkOp = collection.initializeOrderedBulkOp();
//   }
// });

// Clean up queues
// if (count > 0) {
// }

// Schedule tasks to be run on the server.
// cron.schedule("* * * * *", function () {
//   console.log("running a task every minute");
// })
