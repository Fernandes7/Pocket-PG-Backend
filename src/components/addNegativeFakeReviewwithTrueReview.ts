import { averagefinder } from "./averagefinder"

const addNegativeFakeReviewwithTrueReview=async(sentiemntalreviewdata:any,review:string,score:number)=>{
    const data={review:review,score:score}
    sentiemntalreviewdata.truereview.push(...sentiemntalreviewdata.fakereview)
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
    sentiemntalreviewdata.fakereview=[]
    sentiemntalreviewdata.checkpoint=[]
    const saved=await sentiemntalreviewdata.save()
    return saved

}

export {addNegativeFakeReviewwithTrueReview}