const express = require("express");
const cors = require("cors");
const http = require("http");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const cookieParser = require("cookie-parser");
const app = express();

require("dotenv").config();
const connectToDatabase = require("./db/db");
connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
