import { Request, Response } from "express";
import { uploadimagetocloudinary } from "../components/cloudinaryimageupload";
import { HostelSchema } from "../models/hostelModel";
import { LocationSchema } from "../models/locationmodel";
import { ReviewSchema } from "../models/reviewModel";
import { FavHostelSchema } from "../models/favoritehostelModel";
import { BookingSchema } from "../models/bookingModel";
import { sendBookingEmail } from "../components/bookingEmailsender";
import { UserSchema } from "../models/usermodel";
import { AddRequestSchema } from "../models/addHostelRequestSchema";
import { sendRequestEmail } from "../components/requestEmailsender";

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
        await HostelSchema.findByIdAndUpdate(hostelid,{$inc:{availablerooms:-1}})
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

const searchHostelByname=async(req:Request,res:Response)=>{
    try
    {
    const hostels=await HostelSchema.find({hostelname:{$regex:req.body.data.name,$options:"i"}})
    if(hostels.length>0)
    res.status(200).json({success:true,data:hostels})
    else
    res.status(200).json({success:false,data:"No Hostel Found with tis name"})
    }
    catch(e:any)
    {
        res.status(500).json({succcess:false,data:e.message})
    }
}


const viewFavhostelbyUserid=async(req:Request,res:Response)=>{
    try{
    const hostels=await FavHostelSchema.find({userid:req.body.data}).populate("hostelid")
    if(hostels)
    {
        res.status(200).json({success:true,data:hostels})
    }
    }
    catch(e:any)
    {
        res.status(500).json({success:false,data:e.message})
    }
}


const deleteFavhostel=async(req:Request,res:Response)=>{
    try{
        const delhostels=await FavHostelSchema.findByIdAndDelete(req.body.data)
        if(delhostels)
        {
            res.status(200).json({success:true,data:delhostels})
        }
        }
        catch(e:any)
        {
            res.status(500).json({success:false,data:e.message})
        }
}


const addRequest=async(req:Request,res:Response)=>{
    try{
    const addedHostel=new AddRequestSchema(req.body.data)
    const saved=await addedHostel.save()
    const mailsend=await sendRequestEmail(saved)
    if(mailsend)
    res.status(200).json({success:true,data:saved})
    }
    catch(e:any)
    {
        res.status(500).json({success:false,data:e.message})
    }
}


const Viewbookigbyuserid=async(req:Request,res:Response)=>{
    try{
    const finded=await BookingSchema.find({userid:req.body.data}).populate("hostelid")
    if(finded.length>0)
    res.status(200).json({success:true,data:finded})
    else
    res.status(200).json({success:false,data:"Error In Retriving Booking"})
    }
    catch(e:any)
    {
        res.status(500).json({success:false,data:e.message})
    }
}

const documentcounts=async(req:Request,res:Response)=>{
    try{
    const hc=await HostelSchema.countDocuments()
    const rc=await ReviewSchema.countDocuments()
    const uc=await UserSchema.countDocuments()
    const bc=await BookingSchema.countDocuments()
    res.status(200).json({success:true,hc:hc,rc:rc,uc:uc,bc:bc})
    }
    catch(e:any)
    {
        res.status(500).json({success:false,data:e.message})
    }


}

const viewallhostel=async(req:Request,res:Response)=>{
    try
    {
    const hostels=await HostelSchema.find()
    if(hostels)
    res.status(200).json({success:true,data:hostels})
    }
    catch(e:any)
    {
        res.status(500).json({success:false, data:e.message})
    }

}

const viewBookings=async(req:Request,res:Response)=>{
    try{
    const bookings=await BookingSchema.find().populate("userid").populate("hostelid")
    if(bookings)
    res.status(200).json({success:true,data:bookings})
    }
    catch(e:any)
    {
        res.status(500).json({success:false,data:e.message})
    }
}


export {viewBookings,viewallhostel,documentcounts,addHostel,searchHostelByname,viewhostelsbasedonlocation,viewHostelReviewByHostelid,viewHostelbyid,addBooking,addfavhostel,viewFavhostelbyUserid,deleteFavhostel,addRequest,Viewbookigbyuserid}