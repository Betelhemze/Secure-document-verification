const mongoose = require("mongoose");
const {v4:uuidv4 } = require("uuid");
const documentSchema = new mongoose.Schema(
  {
    title: String,
    documentType: String,
    dateOfIssue: String,
    issuerReference: String,
    ownerName: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verified: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verifiedAt: Date,
    uniqueId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    qrCode: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "Draft",
        "Issued",
        "Verified",
        "Rejected",
        "Revoked",
        "Expired",
        "Archived",
      ],
      default: "Issued",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
