import express from "express"
import { upload } from "../connections/multer"
import { addBooking, addHostel, addRequest, addfavhostel, deleteFavhostel, searchHostelByname, viewFavhostelbyUserid, viewHostelReviewByHostelid, viewHostelbyid, viewhostelsbasedonlocation } from "../controller/hostelController"

const router=express.Router()

router.post("/addhostel",upload.single("image"),addHostel)
router.post("/vh",viewhostelsbasedonlocation)
router.post("/vhh",viewHostelReviewByHostelid)
router.post("/viewhostelbyid",viewHostelbyid)
router.post("/addbooking",addBooking)
router.post("/addfavhostel",addfavhostel)
router.post("/sh",searchHostelByname)
router.post("/viewfavbyid",viewFavhostelbyUserid)
router.post("/deletefav",deleteFavhostel)
router.post("/addRequest",addRequest)

export default router