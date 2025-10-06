const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const rolemiddelware = require("../middleware/rolemiddleware");
const {
  uploadDocs,
  viewIssuedDocs,
  verifyDocument,
  viewVerifiedDocs,
  viewUploadedStatus,
} = require("../controllers/documentController");

router.post("/documents",validateToken,rolemiddelware(["admin", "issuer"]), uploadDocs)
router.get("/documents", validateToken, rolemiddelware(["issuer", "admin"]), viewIssuedDocs)
router.patch("/documents/:id/verify", validateToken, rolemiddelware(["verifier", "admin"]), verifyDocument)
router.get("/documents/verified", validateToken, rolemiddelware(["verifier"]), viewVerifiedDocs)
router.get("documents/analytics", validateToken,rolemiddelware(["verifier"]), viewUploadedStatus)

module.exports = router;