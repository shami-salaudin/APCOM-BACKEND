const {Schema,model} = require('mongoose')

const RTO =  new Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    rotName:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    rtoId:{
        type:String,
        required:true 
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})


module.exports = model("RTO",RTO);