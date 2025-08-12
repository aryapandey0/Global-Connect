const Post=require('../models/Post.js');

exports.createPost=async(req,res)=>{
    try{
        console.log('req.file:', req.file);
console.log('req.body:', req.body);

            const {image,content}=req.body;
            const newPost=await Post.create({
                     userId: req.user.id,
                    content: req.body.content,
                    image: req.file?.path,
            });
            res.status(201).json(newPost);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.togglelike=async(req,res)=>{

    try{
    const{postId}=req.body;
    const userId=req.user._id;
    const post=await Post.findById(postId);
    if(!post)res.status(404).json({message:"post not found"});
    if(post.likes.includes(userId)){
        post.likes.pull(userId);//unlike
    }
     else{
        post.likes.push(userId);//like
     }


await post.save();
res.status(201).json({message:"likes updated",likes:post.likes});
    }
catch(err){
    res.status(501).json({message:"error updating likes",error:err.message});
}

}

exports.addcomment=async(req,res)=>{
    try{
            const { postId }=req.params;
            const { text }=req.body;
            const userId=req.user._id;
            const post=await Post.findById(postId);
            if(!post)res.status(500).json({message:"post not found"});

            post.comments.push({user:userId,text});
            await post.save();
            res.status(201).json({message:"comments updated",comments:post.comments});
            
    }
    catch(err){
            res.status(500).json({message:"error adding comment", error:err.message});
    }
}