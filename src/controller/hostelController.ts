import { Request, Response } from "express";
import { uploadimagetocloudinary } from "../components/cloudinaryimageupload";
import { HostelSchema } from "../models/hostelModel";
import { LocationSchema } from "../models/locationmodel";
import { ReviewSchema } from "../models/reviewModel";
import { FavHostelSchema } from "../models/favoritehostelModel";
import { BookingSchema } from "../models/bookingModel";
import { sendBookingEmail } from "../components/bookingEmailsender";
import { UserSchema } from "../models/usermodel";

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


const viewHostelbyid=async(req:Request,res:Response)=>{
try{
const hosteldata=await HostelSchema.findById(req.body.data.hostelid)
if(hosteldata)
{
    const query={
        hostellocation:hosteldata.hostellocation,
        hosteltype:hosteldata.hosteltype,
        _id:{$ne:hosteldata._id}
    }
    const similarhostel=await HostelSchema.find(query).limit(3)
    if(req.body.data.userid)
    {
        const isliked=await FavHostelSchema.findOne({hostelid:req.body.data.hostelid,userid:req.body.data.userid})
        if(isliked)
        res.status(200).json({success:true,data:hosteldata,similarhostel:similarhostel,isliked:true})
        else
    res.status(200).json({success:true,data:hosteldata,similarhostel:similarhostel,isliked:false})
        
    }
    else
    res.status(200).json({success:true,data:hosteldata,similarhostel:similarhostel,isliked:false})

    
}
}
catch(e:any)
{
    res.status(500).json({success:false,data:e.message})
}
}


const viewHostelReviewByHostelid=async(req:Request,res:Response)=>{
    try{
        const fetchData=await ReviewSchema.find({hostelid:req.body.data}).populate("userid")
        if(fetchData)
        res.status(201).json({success:true,data:fetchData})   
    }
    catch(e:any)
    {
        res.status(500).json({success:false,data:e.message})
    }
}


const addBooking=async(req:Request,res:Response)=>{
    try
    {
    const {userid,hostelid}=req.body.data
    const isalreadybooked=await BookingSchema.findOne({userid:userid,hostelid:hostelid})
    if(isalreadybooked)
    res.status(200).json({success:false,data:"You have already booked this hostel"})
    else
    {
        const newbooking=new BookingSchema(req.body.data)
        const bookingsaved=await newbooking.save()
        const hostel=await HostelSchema.findById(hostelid)
        const user=await UserSchema.findById(userid)
        const sendmail=await sendBookingEmail(user?.useremail!,user?.username!,hostel?.hostelname!,hostel?.hostelimage!,bookingsaved._id,bookingsaved.createdAt)
        if(sendmail)
        res.status(200).json({success:true,data:"Booking is Successfull"})
    }
    }
    catch(e:any)
    {
        res.status(500).json({success:false,data:e.message})
    }
}

const addfavhostel=async(req:Request,res:Response)=>{
try
{
const newfavdata=new FavHostelSchema(req.body.data)
const saveddata= await newfavdata.save()
if(saveddata)
res.status(200).json({success:true,data:"Added Successfully"})
}
catch(e:any)
{
    res.status(500).json({success:false,data:e.message})
}
}



export {addHostel,viewhostelsbasedonlocation,viewHostelReviewByHostelid,viewHostelbyid,addBooking,addfavhostel}