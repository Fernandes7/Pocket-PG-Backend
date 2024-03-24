import { ObjectId } from "mongoose"
import { ReviewSchema } from "../models/reviewModel"

const addFakeReview=async(sentimentalReviewSchema:any,review:string,score:number,hostelid:ObjectId,userid:ObjectId)=>{
    try{
    const data={review:review,score:score}
    const savereview=new ReviewSchema({hostelid:hostelid,userid:userid,hostelreview:data})
    const savedReview=await savereview.save()
    if(savedReview)
    {
    const fakedata={...data,reviewid:savedReview._id}
    sentimentalReviewSchema.fakereview.push(fakedata)
    const saved=await sentimentalReviewSchema.save()
    return saved
    }
    }
    catch(e:any)
    {
        return e.message
    }

}

export {addFakeReview}