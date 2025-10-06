const express = require("express");
const router = express.Router();

const { signUp, login } = require("../controllers/authcontroller");

router.post("/register", signUp);
router.post("/login", login);

module.exports = router;