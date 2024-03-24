import { findSentimentalAnalysisScore } from "./findSentimentalScore"

const addNegativeReview=async(sentimentalReviewSchema:any,review:string,score:number)=>{
    try{
    const data={review:review,score:score}
    sentimentalReviewSchema.negativereview.push(data)
    const saved=await sentimentalReviewSchema.save()
    return saved
    }
    catch(e:any)
    {
        return e.message
    }

}

export {addNegativeReview}