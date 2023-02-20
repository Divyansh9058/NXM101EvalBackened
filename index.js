const express = require("express");
require("dotenv").config();

const connection  = require("./configs/db")

const {UserRouter} = require("./Routes/user.routes")
const {PostRouter} = require("./Routes/post.routes")

const {authenticate} = require("./Middleware/auth.middleware")
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());


app.use("/users",UserRouter);
app.use(authenticate);
app.use("/posts",PostRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to Db")
    }
    catch(err){
        console.log(err.message)
    }
    console.log("Server in run on PORT 4500")
})