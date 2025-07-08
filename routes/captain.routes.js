const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");
router.post(
  "/register",
  [
    body("fullname.firstname").isLength({ min: 2 }).withMessage("First name must be at least 2 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("vehicle.color").isLength({ min: 2 }).withMessage("Vehicle color is required"),
    body("vehicle.plate").isLength({ min: 2 }).withMessage("Plate must be at least 2 characters"),
    body("vehicle.capacity").isLength({ min: 1 }).withMessage("Vehicle capacity is required"),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Vehicle type must be car, motorcycle, or auto"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [body("email").isEmail().withMessage("Invalid email"), body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")],
  captainController.loginCaptain
);
router.get("/profile", authMiddleware.authCaptain, captainController.getCaptainProfile);
router.get("/logout",  authMiddleware.authCaptain, captainController.logoutCaptain);


module.exports = router;
