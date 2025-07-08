const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  blacklistedAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24,
  },
});

module.exports = mongoose.model("BlacklistToken", blacklistedTokenSchema);
