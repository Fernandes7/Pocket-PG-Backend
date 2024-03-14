import { Request, Response } from "express";
import { uploadimagetocloudinary } from "../components/cloudinaryimageupload";
import { LocationSchema } from "../models/locationmodel";



const addlocation = async (req:any, res: Response) => {
  try {
    const imagedata=await uploadimagetocloudinary(req.file.buffer)
    if (imagedata)
    {
      const newlocationdata=new LocationSchema({
        ...req.body,
        imageurl:imagedata.secure_url
      })
      const saveddata=await newlocationdata.save()
      if(saveddata)
      res.status(201).json({success:true,data:saveddata})
    }
    else res.json({ success: false });
  } catch (e: any) {
    res.json({ success: false, data: e.message }).status(500);
  }
};

const viewlocation=async(req:Request,res:Response)=>{
  try{
  const loactiondata=await LocationSchema.find()
  if(loactiondata)
  res.status(201).json({success:true,data:loactiondata})
  }
  catch(e:any)
  {
    res.send({success:false,data:e.message}).status(500)
  }
}

export { addlocation,viewlocation };
