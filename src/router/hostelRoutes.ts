import express from "express"
import { upload } from "../connections/multer"
import { addHostel, viewHostelReviewByHostelid, viewhostelsbasedonlocation } from "../controller/hostelController"

const router=express.Router()

router.post("/addhostel",upload.single("image"),addHostel)
router.post("/vh",viewhostelsbasedonlocation)
router.post("/vhh",viewHostelReviewByHostelid)

export default router