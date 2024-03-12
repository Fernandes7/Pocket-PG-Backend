import mongoose from "mongoose";

//Schema Design
const locationSchema=new mongoose.Schema({
    locationname:String,
    imageurl:String,
    hostelcount:{type:Number,default:0}
})

//Model(Table) creation
const LocationSchema=mongoose.model("LocationData",locationSchema)

export {LocationSchema}