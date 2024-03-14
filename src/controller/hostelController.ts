import { Request, Response } from "express";
import { uploadimagetocloudinary } from "../components/cloudinaryimageupload";
import { HostelSchema } from "../models/hostelModel";
import { LocationSchema } from "../models/locationmodel";

const addHostel=async(req:any,res:Response)=>{
    try{
    const imagedata=await uploadimagetocloudinary(req.file.buffer)
    if(imagedata)
    {
    const newhosteldata=new HostelSchema({
        ...req.body,
        hostelimage:imagedata.secure_url
    })
    const saveddata=await newhosteldata.save()
    if(saveddata)
    {
        const locationdataupdate=await LocationSchema.findOne({locationname:req.body.hostellocation})
        if(locationdataupdate)
        {
            let hostels=locationdataupdate.hostelcount+1
            const savedata=await LocationSchema.findByIdAndUpdate(locationdataupdate._id,{hostelcount:hostels})
            if(savedata)
            res.status(201).json({success:true,data:"Hostel data saved Successfully and Hostel count updated"})
            else
            res.status(201).json({success:false,data:"Failed to Add Hostels and update location"})
        }
    }
    }
}
catch(e:any)
{
    res.status(500).json({success:false,data:e.message})
}
}

const viewhostelsbasedonlocation=async(req:Request,res:Response)=>{
    try{
    const hostelsinparticularlocation=await HostelSchema.find({hostellocation:req.body.data})
    if(hostelsinparticularlocation)
    res.status(201).json({success:true,data:hostelsinparticularlocation})
    else
    res.status(201).json({success:false,data:"failed to fetch hostels in that location"})
}
catch(e:any)
{
    res.status(500).json({success:false,data:e.message})
}
}


export {addHostel,viewhostelsbasedonlocation}