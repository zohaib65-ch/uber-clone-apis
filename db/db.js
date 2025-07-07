const mongoose = require("mongoose");
function connectToDatabase() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}
module.exports = connectToDatabase;
// Export the mongoose instance for use in other modules
// This allows us to use the same connection across the application
