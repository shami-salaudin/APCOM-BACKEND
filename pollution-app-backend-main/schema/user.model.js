const {Schema,model} = require('mongoose')

const USER =  new Schema({
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    DOB:{
        type:Date,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    phNo:{
        type:String,
        required:true
    },
    vhcNo:{
        type:String,
        required:true,
        unique: true
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
    serviceCenter:{
        type:String,
        required:true,
        default:"Not Updated yet"
    },
    ndos:{
        type:String,
        require:true,
        default:"Not Updated yet"
    },
    emission:{
        required:true,
        type:Number,
        default:0
    },
    fine:{
        require:true,
        type:Number,
        default:0
    }
})


module.exports = model("USER",USER)