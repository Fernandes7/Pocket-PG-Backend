import mongoose from "mongoose";

const sentimentalSchema=new mongoose.Schema({
    hostelid:{type:mongoose.Schema.Types.ObjectId,ref:"HostelsData"},
    truereview:[],
    postivereview:[],
    negativereview:[],
    predictedrating:{type:Number},
    previouspredictedrating:[],
    fakereview:[],
    checkpoint:[],
    actualreview:{type:Number}
},{timestamps:true})

const SentimentalSchema=mongoose.model("SentimentalData",sentimentalSchema)

export {SentimentalSchema}