const express = require("express");
const cors = require("cors");
const http = require("http");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();
const connectToDatabase = require("./db/db");
connectToDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});
