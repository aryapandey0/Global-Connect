const jwt=require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) return res.status(401).json({ message: 'Invalid token' });

    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }

}







const protect=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer ')){
       return res.status(401).json({error:'token not provided'});
    }
    try{
        const token=authHeader.split(' ')[1];
          console.log('JWT_SECRET in protect:', process.env.JWT_SECRET);
        console.log('Token in protect:', token);
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
           console.log('decoded token:', decoded);
        req.user=decoded;
      


        next();

    } catch (err) {
   return res.status(401).json({ error: 'Token invalid or expired' });
  }
}

module.exports={ protect };