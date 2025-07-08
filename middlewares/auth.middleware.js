const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1]);
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }
    const isBlackListed = await BlacklistToken.findOne({ token: token });

    if (isBlackListed) {
      return res.status(401).json({ message: "Unauthorized — token is blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
