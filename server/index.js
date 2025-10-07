require("dotenv").config();
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectionDB = require("./config/db.js");
const errorHanlder =require("./middleware/errorHandler")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const documentRoutes = require("./routes/documentRoute")
const cors = require("cors");

connectionDB();


const port = process.env.PORT || 3000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/document",documentRoutes);
app.use(errorHanlder);

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});
app.get("/api/test", (req, res) => {
  res.json({ message: "hello from backend" });
});

app.listen(3000, () => {
  console.log("server running on port 3000!");
});
