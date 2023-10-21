const { bookAppointmentFunction, checkAppointmentStatus } = require("../controller/appointmentController");

const router = require("express").Router();
router.route("/appointment/create").post(bookAppointmentFunction);
router.route("/appointment/status").post(checkAppointmentStatus);
module.exports = router;
