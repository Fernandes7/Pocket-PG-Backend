import mongoose from "mongoose";

const hostelSchema=new mongoose.Schema({
    hostelname:{type:String},
    hostellocation:{type:String},
    hosteltown:{type:String},
    hostelimage:{type:String},   
    hostelrent:{type:Number},
    hostellatitude:{type:Number},
    hostellongitude:{type:Number},
    hosteltype:{type:String},
    hostelservices:{type:[]},
    hostelinitialrating:{type:Number},
    hostelimagelinks:{type:String},
    hosteladdress:{type:String},
    hostelcontactno:{type:String},
    hostelemail:{type:String},
    nearbylocations:{type:String},
    gateclosetime:{type:String},
    visitorallowed:{type:String},
    warden:{type:String},
    noticeperiod:{type:String},
    restrictions:{type:String},
    prohibitions:{type:String},
    securitydeposite:{type:String},
    pricecustomization:{type:String},
    customservices:{type:String},
    Ironing:{type:String},
    Food:{type:String},
    Washing:{type:String}
})

const HostelSchema=mongoose.model("HostelsData",hostelSchema)

export {HostelSchema}