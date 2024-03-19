import express from "express"
import { upload } from "../connections/multer"
import { addHostel, viewhostelsbasedonlocation } from "../controller/hostelController"

const router=express.Router()

router.post("/addhostel",upload.single("image"),addHostel)
router.post("/vh",viewhostelsbasedonlocation)

export default router