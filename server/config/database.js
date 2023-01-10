// const config = require("dotenv");
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    mongoose.set("strictQuery", false);
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
