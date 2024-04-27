import mongoose from "mongoose"

const addRequestschema=new mongoose.Schema({
    name:{type:String},
    emailid:{type:String},
    contactno:{type:String},
    location:{type:String},
    data:{type:String}
})

const AddRequestSchema=mongoose.model("RequestModel",addRequestschema)

export {AddRequestSchema}