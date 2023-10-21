const User = require("../models/User");
const jwt = require("jsonwebtoken");
exports.isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
      if (!token) {
        return res.status(404).json({
          success: false,
          message: "No token Found , Please login first.",
        });
      }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
          return res.status(423).json({
            success: false,
            message: "Invalid token provided, Please Login First.",
          });
        }
        let user = await User.findOne({_id:decode});
        console.log(user)
        if (!user) {
          return res.status(409).json({
            success:false,
            message:" Token Compromised"
          }) 
        }
        req.user = user._id;
        next();
      console.log(`Authenticating 😀 ${user.fullname} at ${new Date().toLocaleDateString()}`)
      console.log(`✔ Auth middlewre is working Properly.`)
    } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
