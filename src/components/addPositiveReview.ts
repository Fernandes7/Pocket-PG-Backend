import { findSentimentalAnalysisScore } from "./findSentimentalScore"

const addPoitiveReview=async(sentimentalReviewSchema:any,review:string,score:number)=>{
    try{
    const data={review:review,score:score}
    sentimentalReviewSchema.postivereview.push(data)
    const saved=await sentimentalReviewSchema.save()
    return saved
    }
    catch(e:any)
    {
        return e.message
    }

}

export {addPoitiveReview}