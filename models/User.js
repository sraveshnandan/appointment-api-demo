const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  fullname: { type: String, 
    required: ["true", "You can't leave it empty."] },
  email: {
    type: String,
    required: true,
    unique: ["true", "Email already exists."],
  },
  password: {
    type: String,
    required: ["true", "You have enter your password"],
    minlength: [6, "Password must contain at least 6 character."],
  },
  dateOfJoin: { type: Date, default: Date.now() },
  isAdmin: { type: Boolean, default: true },
});
//Hashing password before saving it to the database
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//Function to generate the token for the login
UserSchema.methods.generateAuthToken =  (id) => {
  const token =  jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  // console.log(token);

  return token;
};
//Function to compare the password with the password entered by the user
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



const User = new mongoose.model("User", UserSchema);
module.exports = User;
