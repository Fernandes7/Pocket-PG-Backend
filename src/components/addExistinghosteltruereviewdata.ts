import { averagefinder } from "./averagefinder"
import { findSentimentalAnalysisScore } from "./findSentimentalScore"

const addExistingHostelTrueReview=async(sentiemntalreviewdata:any,review:string)=>{
    const score=findSentimentalAnalysisScore(review)
    const data={review:review,score:score}
    sentiemntalreviewdata.truereview.push(data)
    const previouspredictedrating=sentiemntalreviewdata.predictedrating
    sentiemntalreviewdata.previouspredictedrating=previouspredictedrating
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
    const saved=await sentiemntalreviewdata.save()
    return saved

}

export {addExistingHostelTrueReview}