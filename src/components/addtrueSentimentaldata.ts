import { ObjectId } from "mongoose";
import { SentimentalSchema } from "../models/sentimentalModel";
import { findSentimentalAnalysisScore } from "./findSentimentalScore";

const addtruesentimentaldata=async(hostelid:ObjectId,review:string)=>{
    try{
    const addnewdata=new SentimentalSchema({hostelid:hostelid,truereview:[]})
        const score=findSentimentalAnalysisScore(review)
        const data={review:review,score:score}
        addnewdata.truereview.push(data)
        const savesentimetaldata=await addnewdata.save()
        if(savesentimetaldata)
        return savesentimetaldata
    }
    catch(e:any)
    {
        return e.message
    }
}

export {addtruesentimentaldata}