const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Document = require("../models/documentSchema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");

const uploadDocs = asyncHandler(async(req,res) =>{
     const { title, documentType, dateOfIssue, issuerReference, ownerName } =
       req.body;

     if (
       !title ||
       !documentType ||
       !dateOfIssue ||
       !issuerReference ||
       !ownerName
     ) {
       res.status(400);
       throw new Error("All fields are required");
     }

     if (!["issuer", "admin"].includes(req.user.role)) {
       res.status(403);
       throw new Error("Access denied");
     }

     const newDoc = await Document.create({
       title,
       documentType,
       dateOfIssue,
       issuerReference,
       ownerName,
       uploadedBy: req.user.id,
       verified: false,
     });
     //generte a qrcode(dataURL) from the document uniqueID
     const qrCodeData = await QRCode.toDataURL(`http://localhost:5173`);

     //save qr code onto the document
       newDoc.qrCode = qrCodeData;
       await newDoc.save();

       res.status(201).json({
         message: "Document uploaded successfully",
         document: newDoc,
       });
});
 const getDocuments = async (req, res) => {
  try {
    const { type, status, startDate, endDate } = req.query;
    const query = {};

    if (type) query.documentType = { $in: type.split(",") };
    if (status) query.status = { $in: status.split(",") };

    if (startDate || endDate) {
      query.dateOfIssue = {};
      if (startDate) query.dateOfIssue.$gte = new Date(startDate);
      if (endDate) query.dateOfIssue.$lte = new Date(endDate);
    }

    const documents = await Document.find(query);
    res.status(200).json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching documents" });
  }
};

 const updateDocumentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Document.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Document not found" });

    res.status(200).json({ message: "Status updated", document: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update document" });
  }
};

 const getDocumentHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.status(200).json({ history: doc.history || [] });
  } catch (err) {
    res.status(500).json({ message: "Failed to get history" });
  }
};



















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

module.exports = {
  uploadDocs,
  viewIssuedDocs,
  verifyDocument,
  viewVerifiedDocs,
  viewUploadedStatus,
  getDocuments,
  updateDocumentStatus,
  getDocumentHistory,
};

