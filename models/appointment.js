const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    email: { type: String, unique: true },
    date: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "none"],
    },
    type: { type: String },
    phone: { type: Number },
    message: { type: String },
    address: { type: String },
    status: {
      type: String,
      default: "pending",
    },
  },

  { timeStamp: true }
);
module.exports = mongoose.model("Appointment", AppointmentSchema);
