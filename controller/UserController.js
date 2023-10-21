const User = require("../models/User");

// const ExcelJS = require("exceljs");

exports.createUserFunction = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    console.log(req.body);
    let user = await User.findOne({ email });
    if (user) {
      return res.status(420).json({
        success: true,
        message: "Email already exists.",
      });
    }

    user = await User.create({
      fullname,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      details: user,
      message: "Account Created.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUserFunction = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No accound found.",
      });
    }

    console.log(` 🗝 ${user.fullname} is trying to log in  . Matching password.`);
    let isPassMatched = await user.matchPassword(password);
    if (!isPassMatched) {
      console.log(` 👿 ${user.fullname} is trying to log in  .  password not matched .`);
      return res.status(423).json({
        success: false,
        message: "Invalid credientials.",
      });
    }
    console.log(` 😀  ${user.fullname} is trying to log in  .  password matched .`);
    const token = user.generateAuthToken(user._id);
    console.log(`${user.fullname} is trying to log in . Generating auth Token.`)
    res
      .status(200)
      .cookie("token", token, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      })
      .json({
        success: true,
        _id:user._id,
        message: "Logged in Successfully.",
      });

      console.log(` 😎 ${user.fullname} logged in successfully.`)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getProfileFunction = async (req, res)=>{
  try {
    const {id} = req.query;
    let user = await User.findById(id);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"Invalid User Id."
      })
    }
    res.status(200).json({
      success:true,
      message:"Authenticated."
    })
    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
    
  }
}
exports.logoutUserFunction = async(req, res)=>{
  try {
    console.log(`User logged Out`)
    res.status(200).cookie("token", '').json({
      success:true,
      message:'Logged Out Successfully.'
    })
    
  } catch (error) {
    
  }
}



