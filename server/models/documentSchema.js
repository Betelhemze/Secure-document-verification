const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    institution: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verified: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verifiedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
