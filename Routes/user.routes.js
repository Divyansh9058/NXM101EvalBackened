const express = require("express");

const {usermodel} = require("../Model/usermodel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserRouter = express.Router();

const app = express();
app.use(express.json());


UserRouter.post("/register",async(req,res)=>{
      
    const {name,email,gender,password,age,city} = req.body;
    try{
        const user = await usermodel.find({email});
        if(user.length==0){
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({"msg":"Something went wrong",err:err.message})
            }else{
                const user = new usermodel({name,email,gender,password:hash,age,city})
                await user.save();
                res.send({"msg":"data added to DB"})
            }
        })
    }   else{
        res.send("User already exist, please login")
    }
    }
    catch(err){
        res.send({"msg":"Something Wrong"})
    }
})


UserRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await usermodel.find({email});

        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                const token = jwt.sign({email:email,User:user[0]._id},"masai");
                res.send({"msg":"Logged in Successfully"})
                }else{
                    res.send({"msg":"Something went wrong"})
                }
            })
        }else{
            res.send("Wrong Credentials")
        }
    }
    catch(err){
        res.send("Something went Wrong")
    }
})


module.exports={
    UserRouter
}


