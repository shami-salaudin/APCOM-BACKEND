const {Schema,model} = require('mongoose')

const serCen =  new Schema({
    email:{
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
    password:{
        type:String,
        required:true
    },
    serCenAddress:{
        type:String,
        required:true
    },
    serCenName:{
        type:String,
        required:true 
    },
    
})


module.exports = model("serCen",serCen);
