const express = require("express");
const app = express();
app.use(express.json())
const bcrypt = require("express");
const jwt = require("jsonwebtoken");
const PostRouter = express.Router();
const {postmodel} = require("../Model/postmodel")

PostRouter.get("/",async(req,res)=>{
    const token = req.headers.authorization

    if(token){
        jwt.verify(token,"masai",async(err,decoded)=>{
            if(decoded){
                const post = await postmodel.find({author:decoded.User})
                res.send(post)
            }else{
                res.send({"msg":"Wrong token"})
            }
        })
    }
    else{
        res.send("Please login first")
    }
})


PostRouter.get("/top",async(req,res)=>{
    try{
        
    }
    catch(err){

    }
})



PostRouter.post("/create",async(req,res)=>{
    try{
        const payload = req.body;
        const newpost = await postmodel(payload);
        newpost.save();
        res.send({msg:"new post created"})
    }
    catch(err){
        res.send({msg:"something went wrong"})
    }
})

PostRouter.patch("/update/:id",async(req,res)=>{
        try{
            const id = req.params.id;
            const payload = req.body;

            await postmodel.findByIdAndUpdate(id,payload)
            res.send({"msg":"Data Updated"})
        }
        catch(err){
            res.send({"msg":"Something went wrong"})
        }
})


PostRouter.delete("/delete/:id",async (req,res)=>{
    const postID = req.params.id;
    await postmodel.findByIdAndDelete({_id:postID})
    res.send({"msg":"Data Deleted"})
})






module.exports = {
    PostRouter
}