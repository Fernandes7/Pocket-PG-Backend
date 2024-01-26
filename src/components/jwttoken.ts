import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Types } from "mongoose"


dotenv.config()

const createJsonwebtoken=(id:Types.ObjectId)=>{
const token=jwt.sign({"userid":id},process.env.JSONSECRETKEY!,{expiresIn:"30s"})
if(token)
return token
}

const createrefreshtoken=(id:Types.ObjectId)=>{
    const refreshtoken=jwt.sign({"userid":id},process.env.JSONSECRETKEY!);
    if (refreshtoken)
    return refreshtoken
}

export {createJsonwebtoken,createrefreshtoken}