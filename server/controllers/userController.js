const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const getProfile = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json(user);
});
const viewAlluser = asyncHandler(async (req, res) => {
     if (req.user.role !== "admin") {
       res.status(403);
       throw new Error("Access denied");
     }

     const users = await User.find().select("-password"); // exclude password
     res.status(200).json(users);
  
});
const Approveissuer = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user || user.role !== "issuer") {
      return res.status(404).json({ message: "Issuer not found" });
    }

    user.isApproved = true;
    await user.save();

    res.status(200).json({ message: "Issuer approved", user });
});


module.exports = {getProfile,viewAlluser,Approveissuer}