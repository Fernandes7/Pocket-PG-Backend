import express from "express"
import { upload } from "../connections/multer"
import { Viewbookigbyuserid, addBooking, addHostel, addRequest, addfavhostel, deleteFavhostel, documentcounts, searchHostelByname, viewFavhostelbyUserid, viewHostelReviewByHostelid, viewHostelbyid, viewallhostel, viewhostelsbasedonlocation } from "../controller/hostelController"

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
router.post("/viewbookingbyid",Viewbookigbyuserid)
router.post("/length",documentcounts)
router.post("/viewallhostels",viewallhostel)

export default router