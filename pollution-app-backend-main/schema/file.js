const {Schema,model} = require("mongoose")

const FileSchema = new Schema({
    filename:{
        type:String,
        required:true 
    },
    path:{
        type:String,
        required:true 
    },
    uploadedAt:{
        type:Date,
        default: Date() 
    },
})

module.exports = model("File",FileSchema)