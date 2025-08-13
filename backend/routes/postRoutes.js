const express=require('express');
const router=express.Router();
const { createPost }=require('../controllers/postController.js');
const { protect }=require('../middleware/authMiddleware.js');
const upload = require('../middleware/upload.js');
router.post('/', protect, upload.single('image'), createPost);
module.exports=router;