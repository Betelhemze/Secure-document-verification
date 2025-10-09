const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Document = require("../models/documentSchema");
const  validateToken  = require("../middleware/validateToken");

// Total uploaded documents by issuer
router.get("/total/:issuerId", validateToken, async (req, res) => {
  try {
    const count = await Document.countDocuments({
      uploadedBy: req.params.issuerId,
    });
    res.json({ total: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Pending verification
router.get("/pending/:issuerId", validateToken, async (req, res) => {
  try {
    const count = await Document.countDocuments({
      uploadedBy: req.params.issuerId,
      status: { $in: ["Issued", "Draft"] },
    });
    res.json({ pending: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verified documents
router.get("/verified/:issuerId", validateToken, async (req, res) => {
  try {
    const count = await Document.countDocuments({
      uploadedBy: req.params.issuerId,
      status: "Verified",
    });
    res.json({ verified: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Uploads per month
router.get("/uploads/monthly/:issuerId", validateToken, async (req, res) => {
     console.log("📡 Monthly uploads route hit");
  try {
    console.log("Issuer ID type:", typeof req.params.issuerId);
const issuerObjectId = new mongoose.Types.ObjectId(req.params.issuerId);
    const stats = await Document.aggregate([
      { $match: { uploadedBy: issuerObjectId } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get 5 most recent uploaded documents by issuer
router.get("/recent/:issuerId", validateToken, async (req, res) => {
  try {
    const recentDocs = await Document.find({ uploadedBy: req.params.issuerId })
      .sort({ createdAt: -1 }) // newest first
      .limit(5)
      .select("title status createdAt"); // only fetch needed fields

    res.json(recentDocs);
  } catch (err) {
    console.error("Error fetching recent documents:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
