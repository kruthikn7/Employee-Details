const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  ID : Number,
  name: String,
  email: String,
  phone: String,
  gender: String,
  department: String,
  location: String,
});

module.exports = mongoose.model('Employee', employeeSchema);