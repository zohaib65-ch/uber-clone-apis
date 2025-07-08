const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [2, `First name must be at least 2 characters`],
      maxlength: [50, `First name must be at most 50 characters`],
    },
    lastname: {
      type: String,

      minlength: [2, `Last name must be at least 2 characters`],
      maxlength: [50, `Last name must be at most 50 characters`],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, `Email must be at least 5 characters`],
    maxlength: [100, `Email must be at most 100 characters`],
  },
  password: { type: String, required: true, select: false },
  socketId: { type: String },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
};
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
