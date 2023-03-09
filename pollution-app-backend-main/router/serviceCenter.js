const express = require("express");
const multer = require("multer");
const router = express.Router();
const crypto=require('crypto');
const {AddServiceCenter} = require("../db")
const File = require("../schema/file");
const verifyToken = require("../middleware/token");
const sercenSchema = require("../schema/serviceCenter.model");
const userModel = require("../schema/user.model");

const upload = multer({dest:"uploads"});

router.get("/",verifyToken,async (req,res)=>{
    let user = req.user;
    user = await  sercenSchema.findOne({email:req.user.email});
    let {email,serCenName}= user;
    return res.json({"status":200,"user":{email,serCenName}});
    //return res.send(req.user);
})
const HashPass=(email,password)=>crypto.createHmac('sha256',email).update(password).digest('base64');

router.post("/",async (req,res)=>{
    const data = req.body;
    console.log(data);
    data.password = HashPass(data.email,data.password)
    let result = await AddServiceCenter(data);
    try{
        if(result.includes("ERROR")){
            return res.json({"status":409,"message":result}).status(409);
        }
    }catch(err){
        console.log(err);
    }
    
    return res.json({"status":200,"message":result});
});

router.post("/file",upload.single("file"),verifyToken,async (req,res)=>{
    console.log("BODY");
    console.log(req.user);
    console.log(req.body);
    console.log(req.file);
    let send  = await File.create({
        filename: req.file.originalname,
        path:req.file.path,
    });
    console.log(send);
    console.log(`${req.headers.origin}/file/${send._id}`);
    let user = await userModel.findOne({vhcNo:req.body.vhcno})
    let sercen = await sercenSchema.findOne({email:req.user.email})

    console.log(user);
    user.ndos=req.body.ndos;
    user.serviceCenter=sercen.serCenName
    await user.save();

    return res.send('<a href="http://localhost:8000/serviceCenterView"> Success click to go home </a>');
});


module.exports = router;
