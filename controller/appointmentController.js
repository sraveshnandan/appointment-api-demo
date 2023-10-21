const Appointment = require("../models/appointment");
const fs = require("fs");

const excel = require("exceljs");
const { generateExcel, generatePDF } = require("../utils/downloadData");

exports.bookAppointmentFunction = async (req, res) => {
  try {
    const {
      fullname,
      email,
      date,
      age,
      gender,
      type,
      phone,
      message,
      address,
    } = req.body;
    let appointment = await Appointment.findOne({ email });
    console.log(appointment)
    if (appointment) {
      return res.status(200).json({
        success: true,
        details: appointment,
        message: "You have already booked an appointment.",
      });
    }

    appointment = await Appointment.create({
      fullname,
      email,
      date,
      age,
      gender,
      type,
      phone,
      message,
      address,
     
    });
    res.status(201).json({
      success: true,
      details: appointment,
      message: "Appointment Booked Successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.checkAppointmentStatus = async (req, res) => {
  try {
    const { phone } = req.body;
    console.log(phone);

    let appointment = await Appointment.findOne({ phone });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "No any appointment found.",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: appointment,
        message: "Appointment found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllAppointmentFunction = async (req, res) => {
  try {
    let data = await Appointment.find();
    if (data.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No appointment yet.",
      });
    }
    const approved = data.filter((a) => {
      return a.status != "pending";
    });
    const pending = data.filter((a) => {
      return a.status != "approved";
    });

    res.status(200).json({
      success: true,
      data,
      message: "Data fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.approveAppointmentFunction = async (req, res) => {
  try {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (appointment === 0) {
      return res.status(404).json({
        success: false,
        status: appointment.status,
        details: appointment,
        message: "Invalid Id provided.",
      });
    }
    if (appointment.status === "approved") {
      return res.status(200).json({
        success: true,
        status: appointment.status,
        details: appointment,
        message: "Appointment is already approved.",
      });
    }
    appointment.status = "approved";
    await appointment.save();
    res.status(200).json({
      success: true,
      message: "Appointment approved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.downloadAppointmentFunction = async (req, res) => {
  try {
    const { type } = req.query;
    const appointments = await Appointment.find();
    if (type === "csv") {
      
      generateExcel(appointments, res);
    } else {
      generatePDF(appointments, res);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
