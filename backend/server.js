const express=require('express');
const router=express.Router();
require('dotenv').config();
const connectDB=require('./config/db.js');
const authRoutes = require('./routes/authRoutes');
const postRoutes=require('./routes/postRoutes.js');

const cors=require('cors');

connectDB();
const app=express();
app.use(cors());
app.use(express.json());



app.use('/api/users',authRoutes);
app.use('/api/posts',postRoutes);

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server running on ${PORT}`));