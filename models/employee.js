const mongoose = require("mongoose");

var Employee = mongoose.model("employees", {
  employeeId: { type: Number },
  employeeName: { type: String },
  joiningDate: { type: Date },
  imageUrl: { type: String },
});

module.exports = { Employee };
