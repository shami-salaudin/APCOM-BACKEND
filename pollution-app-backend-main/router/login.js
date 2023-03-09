const express = require("express")
const crypto=require('crypto');

const userModel = require("../schema/user.model");
const rtoModel = require("../schema/rto.model");
const serCenModel = require("../schema/serviceCenter.model");

const router = express.Router()
const jwt = require('jsonwebtoken');

const HashPass=(email,password)=>crypto.createHmac('sha256',email).update(password).digest('base64')
const secretKey = "kvdskmskldsklfdfmdklfmkldsmfkldsfmdksmfkldsfmkdlfmdjkhdyugqe635467tgregrgnejlgeijghneir hiuerh`"

router.get('/',(req,res)=>res.send("<h1>Hello user</h1>"));

router.post('/user',(req,res)=>{
    console.log(req.body);
    let data;
    userModel.findOne({email:req.body.email},(err,user)=>{
        if(err) return  res.status(500).send("Internal Server Error")
        console.log(user);
        if(!user) return res.status(404).send(`No User found with the id  ${req.body.email} \n Please register an User account`)
        if(HashPass(req.body.email,req.body.password)===user.password){
            data ={
                email:user.email,
                time: Date()
            }
            let token = jwt.sign(data,secretKey, {
                expiresIn: "1d",
              });
            res.json({token:token,type:"user"})
            console.log(data);
            console.log(token);
        }else{
            res.status(401).send("Wrong password")
        }
    });
    
});
router.post('/rto',(req,res)=>{
    console.log(req.body);
    let data;
    rtoModel.findOne({email:req.body.email},(err,user)=>{
        if(err) return  res.status(500).send("Internal Server Error")
        console.log(user);
        if(!user) return res.status(404).send(`No RTO found with the id  ${req.body.email} \n Please register an RTO account`);
        if(HashPass(req.body.email,req.body.password)===user.password){
            data ={
                email:user.email,
                time: Date()
            }
            let token = jwt.sign(data,secretKey, {
                expiresIn: "1d",
              });
              
            res.json({token:token,type:"rto"})
            console.log(data);
            console.log(token);
        }else{
            res.status(401).send("Wrong password")
        }
    });
    
});

router.post('/sercen',(req,res)=>{
    console.log(req.body);
    let data;
    serCenModel.findOne({email:req.body.email},(err,user)=>{
        if(err) return  res.status(500).send("Internal Server Error");
        console.log(user);
        if(!user) return res.status(404).send(`No Service Center found with the id  ${req.body.email} \n Please register a Service Center account`)
        if(HashPass(req.body.email,req.body.password)===user.password){
            data ={
                email:user.email,
                time: Date()
            }
            let token = jwt.sign(data,secretKey, {
                expiresIn: "1d",
              });
              
              res.json({token:token,type:"sercen"})
            console.log(data);
            console.log(token);
        }else{
            res.status(401).send("Wrong password")
        }
    });
    
});

module.exports = router;