import mongoose from "mongoose";

const hostelSchema=new mongoose.Schema({
    hostelname:{type:String},
    hostellocation:{type:String},
    hosteltown:{type:String},
    hostelimage:{type:String},
    hostelrent:{type:Number},
    hostellatitude:{type:Number},
    hostellongitude:{type:Number},
    hosteltype:{type:String}
})

const HostelSchema=mongoose.model("HostelsData",hostelSchema)

export {HostelSchema}