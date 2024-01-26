import { Request, Response } from "express";
import {DecorateRequest} from "../middleware/verifyjwt"
import { UserSchema } from "../models/usermodel";
import { createJsonwebtoken, createrefreshtoken } from "../components/jwttoken";

//User register controller
const signUp = async (req: Request, res: Response) => {
  const isUserEmailExist = await UserSchema.findOne({
    useremail: req.body.data.useremail,
  });
  if (isUserEmailExist)
    res
      .status(400)
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

const login = async (req: Request, res: Response) => {
  try {
    const isUserExist = await UserSchema.findOne({
      useremail: req.body.data.useremail,
    });
    if (isUserExist) {
      if (isUserExist.userpassword === req.body.data.userpassword) {
        const accesstoken = createJsonwebtoken(isUserExist._id);
        const refreshtoken = createrefreshtoken(isUserExist._id);
        if (accesstoken && refreshtoken) {
          res.cookie("accesstoken", accesstoken, { httpOnly: true });
          res.cookie("refreshtoken", refreshtoken, { httpOnly: true });
          res
            .status(201)
            .json({ success: true, data: "User loggined successfully" });
        } else
          res
            .status(401)
            .json({ success: false, data: "Failed to create token" });
      } else res.status(401).json({ success: false, data: "Invalid Password" });
    } else
      res.status(401).json({ success: false, data: "User email is not exist" });
  } catch (error: any) {
    res.status(500).json({ success: false, data: "Server failed while login" });
  }
};

const verify = (req: DecorateRequest, res: Response) => {
  res.status(201).json({success:true, data:req.userid });
};

export { signUp, login, verify };
