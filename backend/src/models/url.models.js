import mongoose from "mongoose";
let urlSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    originalUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    shortCode:{
           type:String,
        required:true,
        unique:true
    },
    clicks:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

let urlModel=mongoose.model("url",urlSchema)
export default urlModel