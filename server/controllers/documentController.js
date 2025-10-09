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
       status: "Draft",
       history: [
         {
           action: "Document created (status set to Draft)",
           userName: req.user.name,
           date: new Date(),
         },
       ],
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

     // Get the current user name or fallback
     const userName = req.user?.name || "System";

     // Find document first (so we can verify it exists)
     const doc = await Document.findById(id);
     if (!doc) {
       return res.status(404).json({ message: "Document not found" });
     }

     // Update status
     doc.status = status;
console.log("Updated status:", doc.status);

     // Push a new history record
     doc.history.push({
       action: `Status changed to ${status}`,
       user: userName,
       date: new Date(),
       
     });

     // Save document
     await doc.save();

     res.status(200).json({
       message: "Status updated successfully",
       document: doc,
       
     });
   } catch (err) {
     console.error("Error updating document status:", err);
     res.status(500).json({ message: "Failed to update document" });
   }
 };


 const getDocumentHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.status(200).json({ history: doc.history || [] });
    console.log("Fetched history:", doc.history);

  } catch (err) {
    res.status(500).json({ message: "Failed to get history" });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const total = await Document.countDocuments();
    const pending = await Document.countDocuments({ status: "Issued" });
    const verified = await Document.countDocuments({ status: "Verified" });
    const rejected = await Document.countDocuments({ status: "Rejected" });

    res.status(200).json({
      total,
      pending,
      verified,
      rejected,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

const verifyDocument = async (req, res) => {
  try {
    const { uniqueId } = req.params;

    // 1️⃣ Check if req.user exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const verifierId = req.user.id;
    const userRole = req.user.role;

    // 2️⃣ Ensure user is a verifier
    if (userRole !== "Verifier") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only verifiers can verify documents.",
      });
    }

    // 3️⃣ Find the document
    const document = await Document.findOne({ uniqueId }).populate(
      "uploadedBy",
      "name institution"
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // 4️⃣ Check status BEFORE updating
    if (document.status !== "Issued") {
      return res.status(400).json({
        success: false,
        message: "Document exists but is not issued yet",
      });
    }

    // 5️⃣ Update document to Verified
    document.status = "Verified";
    document.verified = true;
    document.verifiedBy = verifierId;
    document.verifiedAt = new Date();

    // Add to history
    document.history.push({
      action: "Verified",
      user: verifierId,
      role: "Verifier",
      date: new Date(),
    });

    await document.save();

    // 6️⃣ Return minimal public info
    res.status(200).json({
      success: true,
      message: "Document is authentic and verified",
      data: {
        title: document.title,
        ownerName: document.ownerName || "Unknown Owner",
        issuedBy: document.uploadedBy?.institution || "Unknown Institution",
        issuerName: document.uploadedBy?.name || "Unknown User",
        issueDate: document.dateOfIssue,
        uniqueId: document.uniqueId,
      },
    });
  } catch (error) {
    console.error("Error verifying document:", error);
    res.status(500).json({
      success: false,
      message: "Server error while verifying document",
    });
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
  viewVerifiedDocs,
  viewUploadedStatus,
  getDocuments,
  updateDocumentStatus,
  getDocumentHistory,
  verifyDocument,
};

