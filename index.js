const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const app = express()
// const jwt = require('jsonwebtoken')

const  dbUrl = "mongodb+srv://bhc:82u8OnGgaUq48KyS@pollutionapp.hzueuhd.mongodb.net/?retryWrites=true&w=majority";
//const dbUrl = "mongodb://localhost:27017/Bhc-project"
// routes
const login = require("./router/login")
// const verifyToken = require('./middleware/tokn')
// const userModel = require('./schema/user.model')
const user = require("./router/user");
const rto = require("./router/rto");
const serviceCenter = require("./router/serviceCenter");



// middleware
app.use(cors());
app.use(express.json());    
app.use("/user",user);
app.use("/rto",rto);
app.use("/serviceCenter",serviceCenter);
app.use("/login",login)

app.use(function(err, req, res, next) {
    console.log('ERROR');
    res.status(500);
    res.end('');
    console.error(err.stack);
});

app.get("/",(req,res)=>{
    return res.send("This is a private API ");
})



// app.post('/name',verifyToken,(req,res)=>{
//     res.json(req.user.email);
// });

// app.put('/room',verifyToken,async (req,res)=>{
//   let V= {...req.user}
//   console.log(V);
//   let usr = await userModel.findOne({email:V.email})
//   usr.rooms.push(req.body.rooms)
//   await usr.save()
//   res.json(usr.rooms)
// });




mongoose.connect(dbUrl)
.then(res=>{
    console.log("connected Successfully");
    //console.log(res);
    app.listen(process.env.PORT || 5000);
}).catch(err=>console.log(err));

// function chekVerification(regx,value){
//     console.log(regx.test(value));
// }

//chekVerification(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,"88705152");
