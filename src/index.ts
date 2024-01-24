import express,{ Express,Request,Response } from "express";
import dotenv from "dotenv";


dotenv.config();


const port=process.env.PORT || 3000;
const app:Express=express();

app.get("/healthcheck",(req:Request,res:Response)=>{
res.send("Server of Pocket PG is in Healthy condition")
})   


app.listen(port,()=>{
    console.log(`Server is Running in Port ${port}`)  
}) 