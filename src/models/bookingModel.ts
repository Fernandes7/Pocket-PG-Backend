import mongoose from "mongoose";

const bookingschema=new mongoose.Schema({
    hostelid:{type:mongoose.Schema.Types.ObjectId,ref:"HostelsData",required:true},
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"UsersData",required:true},
    customize:{type:Boolean},
    customizeservices:[]
},{timestamps:true})

const BookingSchema=mongoose.model("Booking",bookingschema)

export {BookingSchema}