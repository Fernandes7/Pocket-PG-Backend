import express from "express"
import { upload } from "../connections/multer"
import { addBooking, addHostel, viewHostelReviewByHostelid, viewHostelbyid, viewhostelsbasedonlocation } from "../controller/hostelController"

const router=express.Router()

router.post("/addhostel",upload.single("image"),addHostel)
router.post("/vh",viewhostelsbasedonlocation)
router.post("/vhh",viewHostelReviewByHostelid)
router.post("/viewhostelbyid",viewHostelbyid)
router.post("/addbooking",addBooking)

export default router