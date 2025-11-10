const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String},
    price:{type:Number,required:true},
    location:{type:String,required:true},
    latitude:{type:Float},
    longitude:{type:Float},
    bedrooms:{type:Number,required:true},
    bathrooms:{type:Number,required:true},
    amenities:[{type:String}],
    propertyType:{type:String,enum:["apartment","house"],require:true},
    images:[{type:String,default:""}],
    status:{type:String,enum:["available","rented"]},
    landlordId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{timestamps:true})

module.exports = mongoose.Schema("Property",propertySchema);