const Captain = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error("All required fields must be provided");
  }

  const hashedPassword = await Captain.hashPassword(password);

  const captain = new Captain({
    fullname: { firstname, lastname },
    email,
    password: hashedPassword,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  await captain.save();
  return captain;
};
