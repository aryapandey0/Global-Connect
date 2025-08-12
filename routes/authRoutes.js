// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require('../middleware/multer');
const authMiddleware = require('../middleware/authMiddleware');

// Register
router.post("/register",upload.single("profilePic"), async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

         const profilePicPath = req.file ? req.file.path : "";

    const user = await User.create({...req.body, name, email, password: hashed ,profilePic: profilePicPath});

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json(userObj);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    // If user registered via Google and has no password
    if (!user.password) return res.status(400).json({ message: "Please login via Google OAuth" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({
      token,
      role: user.role,
      userId: user._id,
      name: user.name,
      profilePic:user.profilePic
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Login failed" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: "Cant Access Users" });
  }
});

router.put("/:id", authMiddleware, upload.single("profilePic"), async (req, res) => {
  const userId = req.params.id;




  if (req.user.userId !== userId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const updateData = { ...req.body };
  
    
    if (req.file) {
      updateData.profilePic = req.file.path; 
    }

   

    if (typeof updateData.skills === "string") {
      updateData.skills = updateData.skills.split(",").map(skill => skill.trim());
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user" });
  }
});



router.get("/user/:id",authMiddleware,async(req,res)=>{
  const userId = req.params.id;
  try{
  const user =await User.findById(userId).select("-password");
return res.json(user);
  }
  catch(err){
    return res.status(400).json({message:"User Not Found"});
  }
})

router.get("/search",authMiddleware,async(req,res)=>{
  const {name} = req.query;
  try{
    const users = await User.find({
      name:{$regex:name,$options : "i"}

          }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  } }
  )


module.exports = router;
