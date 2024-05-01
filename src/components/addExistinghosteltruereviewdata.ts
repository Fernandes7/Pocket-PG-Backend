import { ObjectId } from "mongoose"
import { averagefinder } from "./averagefinder"
import { findSentimentalAnalysisScore } from "./findSentimentalScore"
import { HostelSchema } from "../models/hostelModel"
import { ReviewSchema } from "../models/reviewModel"
import { sendReviewsEmail } from "./hostelreviewmail"

const addExistingHostelTrueReview=async(sentiemntalreviewdata:any,review:string,hostelid:ObjectId,userid:ObjectId)=>{
    const score=findSentimentalAnalysisScore(review)
    const data={review:review,score:score}
    sentiemntalreviewdata.truereview.push(data)
    const previouspredictedrating=sentiemntalreviewdata.predictedrating
    sentiemntalreviewdata.previouspredictedrating.push(previouspredictedrating)
    const average=averagefinder(sentiemntalreviewdata.truereview)
    sentiemntalreviewdata.predictedrating=average
    if(average>=4.5)
    sentiemntalreviewdata.actualreview=5
    if(average>=3.5 && average<4.5)
    sentiemntalreviewdata.actualreview=4
    if(average>=3 && average<3.5)
    sentiemntalreviewdata.actualreview=3
    if(average>=1.5 && average<3)
    sentiemntalreviewdata.actualreview=2
    if(average<1.5)
    sentiemntalreviewdata.actualreview=1
    const findHostel=await HostelSchema.findById(hostelid)
    const differnceinreview=Math.abs(findHostel?.hostelinitialrating!-sentiemntalreviewdata.actualreview)
    if(differnceinreview>=1)
    {
        if(findHostel)
        {
        if(findHostel?.hostelinitialrating!>sentiemntalreviewdata.actualreview)
        await sendReviewsEmail(findHostel?.hostelemail!,findHostel?.hostelname!,findHostel?.hosteladdress!)
        findHostel.hostelinitialrating=sentiemntalreviewdata.actualreview
        await findHostel.save()
        }
    }
    const newReviewdata=new ReviewSchema({hostelid:hostelid,userid:userid,hostelreview:data})
    await newReviewdata.save()
    const saved=await sentiemntalreviewdata.save()
    return saved

}

export {addExistingHostelTrueReview}