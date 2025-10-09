const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const rolemiddelware = require("../middleware/rolemiddleware");
const {
  uploadDocs,
  viewIssuedDocs,
  viewVerifiedDocs,
  viewUploadedStatus,
  getDocuments,
  updateDocumentStatus,
  getDocumentHistory,
  verifyDocument,
} = require("../controllers/documentController");

router.post("/",validateToken,rolemiddelware(["admin", "issuer"]), uploadDocs)
router.get("/", getDocuments)
router.patch("/:id/status", validateToken, updateDocumentStatus); // ✅ for Withdraw
router.get("/:id/history", validateToken, getDocumentHistory); // ✅ for history
router.get("/verify/:uniqueId", verifyDocument);
router.get("/", validateToken, rolemiddelware(["issuer", "admin"]), viewIssuedDocs)
router.patch("/documents/:id/verify", validateToken, rolemiddelware(["verifier", "admin"]), verifyDocument)
router.get("/documents/verified", validateToken, rolemiddelware(["verifier"]), viewVerifiedDocs)
router.get("documents/analytics", validateToken,rolemiddelware(["verifier"]), viewUploadedStatus)

module.exports = router;