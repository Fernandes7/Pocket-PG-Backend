import { Request, Response } from "express";
import { DecorateRequest } from "../middleware/verifyjwt";
import { UserSchema } from "../models/usermodel";
import { createJsonwebtoken, createrefreshtoken } from "../components/jwttoken";
import { createandsendAccesstokenandRefreshToken } from "../components/tokencreate";

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

const login = async (req: Request, res: Response) => {
  try {
    const isUserExist = await UserSchema.findOne({
      useremail: req.body.data.useremail,
    });
    if (isUserExist) {
      if (isUserExist.userpassword === req.body.data.userpassword) {
        const token = createandsendAccesstokenandRefreshToken(isUserExist._id);
        res.cookie("accesstoken", token?.accesstoken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
        });
        res.cookie("refreshtoken", token?.refreshtoken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.status(201).json({ success: true, data: isUserExist._id });
      } else res.status(201).json({ success: false, data: "Invalid Password" });
    } else
      res.status(201).json({ success: false, data: "User email is not exist" });
  } catch (error: any) {
    res.status(500).json({ success: false, data: "Server failed while login" });
  }
};

const verify = (req: DecorateRequest, res: Response) => {
  if (req.userid) res.status(201).json({ success: true, data: req.userid });
  else
    res
      .status(201)
      .json({ success: false, data: "No user is in find in the given jwt" });
};

const finduserbyid = async (req: Request, res: Response) => {
  try {
    const finduser = await UserSchema.findOne({ _id: req.body.data });
    if (finduser) {
      const token = createandsendAccesstokenandRefreshToken(finduser._id);
      res.cookie("accesstoken", token?.accesstoken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });
      res.cookie("refreshtoken", token?.refreshtoken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.status(201).json({ success: true, data: finduser });
    } else res.status(201).json({ success: false, data: " No user find" });
  } catch (error: any) {
    res.status(201).json({ success: false, data: error.message });
  }
};

export { signUp, login, verify, finduserbyid };
