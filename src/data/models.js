const mongoose = require("mongoose");

const IpDetailsSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  deviceType: {
    type: String,
    required: true,
  },
  browser: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
    
  },
},{collection: "ipdetails"});

const IpDetails = mongoose.model("IpDetails", IpDetailsSchema);


const UserDetailsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
},{collection: "userdetails"});

const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);


module.exports = { IpDetails, UserDetails };

