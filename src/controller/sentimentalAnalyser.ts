import { Request,Response } from 'express';
import { findSentimentalAnalysisScore } from '../components/findSentimentalScore';
import { SentimentalSchema } from '../models/sentimentalModel';
import { addtruesentimentaldata } from '../components/addtrueSentimentaldata';
import { addExistingHostelTrueReview } from '../components/addExistinghosteltruereviewdata';

const findsentimentalscore=(req:Request,res:Response)=>{
    const score=findSentimentalAnalysisScore(req.body.data)
    res.json({scores:score})
}

const sentimentalanalyzer=async(req:Request,res:Response)=>{
    try{
       const {review,hostelid,userid}=req.body.data
       const findsentimentalreviewifexist=await SentimentalSchema.findOne({hostelid:hostelid})
       if(findsentimentalreviewifexist)
       {
       if(findsentimentalreviewifexist.truereview.length<10)
       {
        const saved= await addExistingHostelTrueReview(findsentimentalreviewifexist,review)
        res.status(201).json({success:true,data:saved})
       }
       }
       else
       {
        const saved=await addtruesentimentaldata(hostelid,review)
        res.status(201).json({success:true,data:saved})
       }
    }
    catch(e:any)
    {
        res.status(500).json({success:false,data:e.message})
    }
}

export {findsentimentalscore,sentimentalanalyzer}   