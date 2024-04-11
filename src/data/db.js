const mongoose = require("mongoose");
const db_Name = require("../constants.js");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: db_Name,
    });
    console.log(`MongoDB connected !! DB HOST: ${connection.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};
module.exports = connectDB;
