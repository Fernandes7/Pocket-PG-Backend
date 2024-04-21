import mongoose from "mongoose";

const favHostelschema=new mongoose.Schema({
    hostelid:{type:mongoose.Schema.Types.ObjectId,ref:"HostelsData",required:true},
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"UsersData",required:true},
})

const FavHostelSchema=mongoose.model("FavoriteHostel",favHostelschema)

export {FavHostelSchema}