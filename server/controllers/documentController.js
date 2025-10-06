const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Document = require("../models/documentSchema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const uploadDocs = asyncHandler(async(req,res) =>{
     const { title, content, institution } = req.body;

     if (!title || !content || !institution) {
       res.status(400);
       throw new Error("All fields are required");
     }

     if (!["issuer", "admin"].includes(req.user.role)) {
       res.status(403);
       throw new Error("Access denied");
     }

     const newDoc = await Document.create({
       title,
       content,
       institution,
       uploadedBy: req.user.id,
       verified: false,
     });
       res.status(201).json(newDoc);
});
const viewIssuedDocs = asyncHandler(async (req, res) => {
    if (!["issuer", "admin"].includes(req.user.role)) {
      res.status(403);
      throw new Error("Access denied");
    }

    const filter =
      req.user.role === "issuer" ? { uploadedBy: req.user.id } : {};
    const documents = await Document.find(filter);
    res.status(200).json(documents);
});
const verifyDocument = asyncHandler(async (req, res) => {
     const { id } = req.params;

     if (!["verifier", "admin"].includes(req.user.role)) {
       res.status(403);
       throw new Error("Access denied");
     }

     const doc = await Document.findById(id);
     if (!doc) {
       res.status(404);
       throw new Error("Document not found");
     }

     doc.verified = true;
     doc.verifiedBy = req.user.id;
     doc.verifiedAt = new Date();
     await doc.save();

     res.status(200).json({ message: "Document verified", doc });
});
const viewVerifiedDocs = asyncHandler(async (req, res) => {
     if (req.user.role !== "verifier") {
       res.status(403);
       throw new Error("Access denied");
     }

     const verifiedDocs = await Document.find({ verified: true });
     res.status(200).json(verifiedDocs);
});
const viewUploadedStatus = asyncHandler(async (req, res) => {
     if (req.user.role !== "issuer") {
    res.status(403);
    throw new Error("Access denied");
  }

  const userId = req.user.id;

  const total = await Document.countDocuments({ uploadedBy: userId });
  const verified = await Document.countDocuments({ uploadedBy: userId, verified: true });
  const pending = total - verified;

  const monthlyUploads = await Document.aggregate([ { $match: { uploadedBy: userId } },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    total,
    verified,
    pending,
    monthlyUploads,
  });
});

module.exports = {uploadDocs, viewIssuedDocs, verifyDocument, viewVerifiedDocs,viewUploadedStatus};

