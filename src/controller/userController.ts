import { Request, Response } from "express";
import {DecorateRequest} from "../middleware/verifyjwt"
import { UserSchema } from "../models/usermodel";
import { createJsonwebtoken, createrefreshtoken } from "../components/jwttoken";


const signUp = async (req: Request, res: Response) => {
  const isUserEmailExist = await UserSchema.findOne({
    useremail: req.body.data.useremail,
  });
  if (isUserEmailExist)
    res
      .status(201)
      .json({ success: false, data: "User already exist with this email" });
  else {
    const userData = new UserSchema(req.body.data);
    try {
      await userData.save();
      res
        .status(201)
        .json({ success: true, data: "User registered Successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, data: error.message });
    }
  }
};

const login = async (req:Request, res: Response) => {
  try {
    const isUserExist = await UserSchema.findOne({
      useremail: req.body.data.useremail,
    });
    if (isUserExist) {
      if (isUserExist.userpassword === req.body.data.userpassword) {
        const accesstoken = createJsonwebtoken(isUserExist._id);
        const refreshtoken = createrefreshtoken(isUserExist._id);
        if (accesstoken && refreshtoken) {  
          res.cookie("accesstoken", accesstoken);
          res.cookie("refreshtoken",refreshtoken)
          res
            .status(201)
            .json({ success: true, data: isUserExist._id });
        } else
          res
            .status(201)
            .json({ success: false, data: "Failed to create token" });
      } else res.status(201).json({ success: false, data: "Invalid Password" });
    } else
      res.status(201).json({ success: false, data: "User email is not exist" });
  } catch (error: any) {
    res.status(500).json({ success: false, data: "Server failed while login" });
  }
};

const verify = async(req: DecorateRequest, res: Response) => {
  try
  {
  if(req.userid)
  {
  const username=await UserSchema.findById(req.userid)
  res.status(201).json({success:true, data:username});
  }
  else
  res.status(201).json({success:false,data:"No user Find in this Token"})
}
catch(e:any)
{
  res.status(500).json({success:false,data:e.message})
}
};

const finduserbyid=async(req:Request,res:Response)=>{
  try{
  const finduser=await UserSchema.findOne({_id:req.body.data})
  if(finduser)
  res.status(201).json({success:true,data:finduser})
  else
  res.status(201).json({success:false,data:" No user find"})
  }
  catch(error:any)
  {
    res.status(201).json({success:false,data:error.message})
  }

}


const upDateuser=async(req:Request,res:Response)=>{
  try{
   await UserSchema.findByIdAndUpdate(req.body.data.id,req.body.data.data)
   const update=await UserSchema.findById(req.body.data.id)
   if(update)
   res.status(200).json({success:true,data:update})
   else
   res.status(200).json({success:false,data:"Failed to update data"})
  }
  catch(e:any)
  {
    res.status(500).json({success:false,data:e.message})
  }
}

export { signUp, login, verify,finduserbyid,upDateuser };   
