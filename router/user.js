const express = require("express");
const router = express.Router();
const {AddUsers} = require('../db')
const crypto=require('crypto');
const verifyToken = require("../middleware/token");
const userModel = require("../schema/user.model");

function validater(req, res, next){
    const secret = "shbvjisinfjwhwew0uei9i0r9roewfnkndjvnsjvid9ivw0fewoi1je901i31312n33kjnjdodccsdpofnfdjf0ieur8"
    const requestUsr = req.body.secret || req.query.secret || req.headers["secret"];
    if(requestUsr!==secret) return res.send("Not a valid user")
    return next();
}

const HashPass=(email,password)=>crypto.createHmac('sha256',email).update(password).digest('base64')

router.post("/",async (req,res)=>{
    const data = req.body;
    console.log(data);
    data.password = HashPass(data.email,data.password)
    let result = await AddUsers(data);
    return res.json({"status":200,"message":result});
});

router.get("/",verifyToken,async (req,res)=>{
    let user = req.user;
    user = await  userModel.findOne({email:req.user.email});
    let {email,vhcNo,name,ndos,serviceCenter,emission,fine}= user;
    return res.json({"status":200,"user":{email,vhcNo,name,ndos,serviceCenter,emission,fine}});
});


router.put("/update",verifyToken,async (req,res)=>{
    console.log(req.body);
    console.log(req.user);
    let user = await userModel.findOne({email:req.user.email})
    user.name= req.body.name;
    user.vhcNo = req.body.Vhcno
    await user.save();
    return res.send(user);
});

router.post("/emission",validater,async (req,res)=>{
    console.log(req.body);
    try{
        let user = await  userModel.findOne({email:req.body.email});
        user.emission = req.body.emission
        await user.save();
        return res.send("ok");
    }catch(err){
        console.log(err);
        return res.send(`No user found with the given id ${req.body.email}`);
    }
    
});

module.exports = router;

// DOB: "2022-08-12T03:57:51.115Z"
// address: "jnjnjnkn"
// country: "mlkmmlkm"
// district: "mkmksmdkmk"
// email: "ff@ff"
// name: "hhnjnj"
// password: "ZW5Q5uZh+It9z3p+3CtW/4r/gFcbXxxNSFKItB/nUfM="
// phNo: "kjnjknjnjn"
// pincode: "mklmklmmk"
// state: "mmkmkmkm"
// vhcNo: ",m m mmkmklm"