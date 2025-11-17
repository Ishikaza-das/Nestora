const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String},
    price:{type:Number,required:true},
    location:{type:String,required:true},
    latitude:{type:Number},
    longitude:{type:Number},
    bedrooms:{type:Number,required:true},
    bathrooms:{type:Number,required:true},
    amenities:{type:[String]},
    propertyType:{type:String,require:true},
    images:{type:[String],default:[]},
    status:{type:String,enum:["available","rented"],default:"available"},
    landlordId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{timestamps:true})

module.exports = mongoose.model("Property",propertySchema);