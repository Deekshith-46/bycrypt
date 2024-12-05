var express=require("express");
var fs=require("fs")
var app=express();
var bcrypt=require("bcrypt");
const { json } = require("body-parser");
app.use(express.json())
app.post("/product",async(req,res)=>{
    res.send(req.body);
    var salt=10;
    var hasheddata=await bcrypt.hash(req.body.password,salt);
    var data={
        username:req.body.username,
        password:hasheddata
    }
    fs.writeFile("./userdetails.json",JSON.stringify(data),"utf-8",(err)=>{
        if(err){
            res.send({
                status:400,
                message:err.message
            })
        }else{
            res.send({
                status:200,
                message:"successfully executed",
                data:data
            })
        }
    })    
})
app.post("/login",async(req,res)=>{
    let userstoreddata=fs.readFileSync("./userdetails.json","utf-8");
    var parseddata=JSON.parse(userstoreddata);
    var {password}=parseddata
    let userpass=req.body.password;
    var matcheddata=await bcrypt.compare(userpass,password)
    res.send(matcheddata);
})
var port=3011;
app.listen(port,()=>{
    console.log("server running...");
    
})