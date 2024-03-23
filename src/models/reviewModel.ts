import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    hostelid:{type:mongoose.Schema.Types.ObjectId,ref:"HostelsData",required:true},
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"UsersData",required:true},
    hostelreview:{type:String},
    hostelscore:{type:Number}
},{timestamps:true}) 

const ReviewSchema=mongoose.model("ReviewsData",reviewSchema)

export {ReviewSchema}