import mongoose from "mongoose";

const locationSchema=new mongoose.Schema({
    locationname:String,
    imageurl:String,
    hostelcount:{type:Number,default:0}
})

const LocationSchema=mongoose.model("LocationsData",locationSchema)

export {LocationSchema}