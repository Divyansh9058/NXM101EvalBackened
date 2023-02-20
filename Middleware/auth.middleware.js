const jwt = require("jsonwebtoken")

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.author = decoded.User
                next()
            }
            else{
                res.send({"msg":"Wrong Token Generated"})
            }
        })
    }
    else{
        res.send("Please login First")
    }
}


module.exports = {
    authenticate
}