import { Request,Response } from 'express';
import { findSentimentalAnalysisScore } from '../components/findSentimentalScore';
import { SentimentalSchema } from '../models/sentimentalModel';
import { addtruesentimentaldata } from '../components/addtrueSentimentaldata';
import { addExistingHostelTrueReview } from '../components/addExistinghosteltruereviewdata';
import { addPoitiveReview } from '../components/addPositiveReview';
import { addNegativeReview } from '../components/addNegativeReview';
import { addFakeReview } from '../components/addFakeReview';
import { addPositiveFakeReviewwithTrueReview } from '../components/addPoitiveFakeReviewwithTrueReview';
import { addNegativeFakeReviewwithTrueReview } from '../components/addNegativeFakeReviewwithTrueReview';
import { ReviewSchema } from '../models/reviewModel';

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
       if(findsentimentalreviewifexist.truereview.length<5)
       {
        const saved= await addExistingHostelTrueReview(findsentimentalreviewifexist,review,hostelid,userid)
        res.status(201).json({success:true,data:saved})
       }
       else
       {
       const currentreviewscore=findSentimentalAnalysisScore(review)
       const differnce=Math.abs(currentreviewscore-findsentimentalreviewifexist.predictedrating!)
       if(differnce<=1.5)
       {
        const saved= await addExistingHostelTrueReview(findsentimentalreviewifexist,review,hostelid,userid)
        if(saved)
        {
            if(currentreviewscore>3)
            {
                const positivesaved=await addPoitiveReview(findsentimentalreviewifexist,review,currentreviewscore)
                res.status(201).json({success:true,data:positivesaved})
            }
            else
            {
                const negativesaved=await addNegativeReview(findsentimentalreviewifexist,review,currentreviewscore)
                res.status(201).json({success:true,data:negativesaved})
            }
        }
       }
       else
       {
        if(findsentimentalreviewifexist.fakereview.length<3)
        {
            const fakesaved=await addFakeReview(findsentimentalreviewifexist,review,currentreviewscore,hostelid,userid)
            if(fakesaved)
            {
            findsentimentalreviewifexist.checkpoint.push(findsentimentalreviewifexist.truereview.length-1)
            const savedcheckpoint=await findsentimentalreviewifexist.save()
            if(savedcheckpoint)
            res.status(201).json({success:true,data:fakesaved})
            }
        }
        else
        {
          if(currentreviewscore>3)
          {
            if(findsentimentalreviewifexist.postivereview.length>findsentimentalreviewifexist.negativereview.length)
            {
             const savedFakeasTrue=await addPositiveFakeReviewwithTrueReview(findsentimentalreviewifexist,review,currentreviewscore)
             if(savedFakeasTrue)
             res.status(201).json({success:true,data:savedFakeasTrue})
            }
            else
            {
             findsentimentalreviewifexist.fakereview.forEach(async(item)=>{
                await ReviewSchema.findByIdAndDelete(item.reviewid)
             })
             findsentimentalreviewifexist.fakereview=[]
             findsentimentalreviewifexist.checkpoint=[]
             const removedFake=await findsentimentalreviewifexist.save()
             if(removedFake)
             res.status(201).json({success:true,message:"Removed Fake",data:removedFake})
            }
          }
          else
          {
            if(findsentimentalreviewifexist.negativereview.length>findsentimentalreviewifexist.postivereview.length)
            {
             const savedFakeasTrue=await addNegativeFakeReviewwithTrueReview(findsentimentalreviewifexist,review,currentreviewscore)
             if(savedFakeasTrue)
             res.status(201).json({success:true,data:savedFakeasTrue})
            }
            else
            {
                findsentimentalreviewifexist.fakereview.forEach(async(item)=>{
                    await ReviewSchema.findByIdAndDelete(item.reviewid)
                 })
             findsentimentalreviewifexist.fakereview=[]
             findsentimentalreviewifexist.checkpoint=[]
             const removedFake=await findsentimentalreviewifexist.save()
             if(removedFake)
             res.status(201).json({success:true,message:"Removed Fake",data:removedFake})
            }
          }
        }
       }
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


const viewsentimentaldata=async(req:Request,res:Response)=>{
    const data=await SentimentalSchema.findById("660077ea2a92c148bad369dc")
    if(data)
    {
        res.status(201).json({success:true,data:data})
    }
}

export {findsentimentalscore,sentimentalanalyzer,viewsentimentaldata}   