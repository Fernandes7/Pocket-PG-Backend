import mongoose from "mongoose";
import dotenv from "dotenv";

//env variable configuration
dotenv.config();

//Database connetion establish
mongoose.connect(process.env.DATABASEURL!);
const connection=mongoose.connection;

connection.on("error",(err)=>{
console.log(`Error in Connection with MongoDB ${err}`)
})

//Callback function for successfull connection
connection.once("open",()=>{
   console.log("Database is connected successfully");
})

export {connection}
