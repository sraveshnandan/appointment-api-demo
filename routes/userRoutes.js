const {
  createUserFunction,
  loginUserFunction,
  logoutUserFunction,
  getProfileFunction,
} = require("../controller/UserController");
const {
  getAllAppointmentFunction, approveAppointmentFunction, downloadAppointmentFunction, 
} = require("../controller/appointmentController");
const { isLoggedIn } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/user/register").post(isLoggedIn, createUserFunction);
router.route("/user/login").post(loginUserFunction);
router.route("/user/logout").get(isLoggedIn,logoutUserFunction);
router.route("/user/auth").get(isLoggedIn,getProfileFunction);

//Apoointment based Routes

router.route("/appointments").get(isLoggedIn, getAllAppointmentFunction);
router.route("/appointments/:id").get(isLoggedIn, approveAppointmentFunction);
router.route("/download/appointments").get(isLoggedIn, downloadAppointmentFunction);

module.exports = router;
