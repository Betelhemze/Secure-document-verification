const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const rolemiddelware = require("../middleware/rolemiddleware");
const {getProfile, viewAlluser, Approveissuer} = require("../controllers/userController");

router.get("/user/me",validateToken,getProfile);
router.get("/user",validateToken,rolemiddelware(["admin"]),viewAlluser)
router.patch("/user/:id/approve",validateToken,rolemiddelware(["admin"]),Approveissuer)

module.exports = router;