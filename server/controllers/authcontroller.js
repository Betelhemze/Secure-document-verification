const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = asyncHandler(async(req,res) =>{
      const {name, email, password, role,  institution} = req.body;

      if (!name || !email || !password || !role || !institution){
        res.status(400);
        throw new Error("all fields required")
      }
      const userAvailable = await User.findOne({email});
      if (userAvailable){
        res.status(400);
        throw new Error("email already exists!")
      }
      const hashedPassword = await bcrypt.hash(password,10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword, 
        role, 
        institution,
      })
      console.log("user created:" , newUser);

      if(newUser) {
        res.status(201).json({_id: newUser.id, email: newUser.email});
      }
      else{
        res.status(400).json({message: "user data not valid"});
      }
});

const login = asyncHandler (async (req,res) =>{
    const {email,password} = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error("all fields are required!");
    }

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
      //create token
        const accessToken = jwt.sign(
          {user:  {
               name: user.name,
                id: user._id,
                role: user.role
                  }
          },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res
          .status(200)
          .json({
            message: "Login successful",
            accessToken,
            role: user.role,
            name: user.name,
            _id: user._id,
          });
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
})
module.exports = {signUp,login};