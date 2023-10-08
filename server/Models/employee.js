const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  salary: Number,
  image: String,
  role: {
    type: String,
    default: "employee"
  },
  gender: String,
  designation: String,
  dateOfJoined: Date,
  hra: Number,
  da: Number,
  ma: Number,
  tax: Number,
  deductionForLeave: Number,
  welfareFund: Number
});

module.exports = mongoose.model("Employee", employeeSchema);
