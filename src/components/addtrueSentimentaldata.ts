import { ObjectId } from "mongoose";
import { SentimentalSchema } from "../models/sentimentalModel";
import { findSentimentalAnalysisScore } from "./findSentimentalScore";
import { HostelSchema } from "../models/hostelModel";

const addtruesentimentaldata=async(hostelid:ObjectId,review:string)=>{
    try{
    const addnewdata=new SentimentalSchema({hostelid:hostelid,truereview:[]})
        const score=findSentimentalAnalysisScore(review)
        const data={review:review,score:score}
        addnewdata.truereview.push(data)
        addnewdata.predictedrating=score
        const hosteldatas=await HostelSchema.findById(hostelid)
        if(hosteldatas)
        {
            const initailhostelrating=hosteldatas.hostelinitialrating
            addnewdata.previouspredictedrating.push(initailhostelrating)
        }
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