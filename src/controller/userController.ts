import { Request, Response } from "express";
import { UserSchema } from "../models/usermodel";

//User register controller
const signUp = async (req: Request, res: Response) => {
  //Verify wheather the user exist already
  const isExist = await UserSchema.findOne({
    useremail: req.body.data.useremail,
  });
  if (isExist)
    res
      .status(400)
      .json({ success: false, data: "User already exist with this email" });
  else {
    //User creation
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

export { signUp };
