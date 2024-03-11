import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Request, Response } from "express";
import fs from "fs";
import { uploadimagetocloudinary } from "../components/cloudinaryimageupload";



const addlocation = async (req:any, res: Response) => {
  try {
    const imagedata=await uploadimagetocloudinary(req.file.buffer)
    if (imagedata)
      res.json({ success: true, imageurl: imagedata.secure_url });
    else res.json({ success: false });
  } catch (e: any) {
    res.json({ success: false, data: e.message }).status(500);
  }
};

export { addlocation };
