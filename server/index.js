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
const analyticsRoutes = require("./routes/analyticsRoutes")
const cors = require("cors");
const cron = require("node-cron");

connectionDB();


const port = process.env.PORT || 3000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/document",documentRoutes);
app.use("/api/analytics", analyticsRoutes);
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
cron.schedule("0 0 * * *", async () => {
  console.log("Checking for expired documents...");
  try {
    const now = new Date();
    const expiredDocs = await Document.updateMany(
      { expiryDate: { $lte: now }, status: { $ne: "Expired" } },
      {
        $set: { status: "Expired" },
        $push: {
          history: {
            action: "Document expired automatically",
            user: "System",
            date: now,
          },
        },
      }
    );
    console.log(`Auto-expired ${expiredDocs.modifiedCount} documents.`);
  } catch (err) {
    console.error("Cron job error:", err.message);
  }
});
