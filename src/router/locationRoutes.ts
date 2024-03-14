import express from "express"
import { addlocation, viewlocation } from "../controller/locationController"
import { upload } from "../connections/multer"

const router=express.Router()

router.post("/addlocation",upload.single("image"),addlocation)
router.get("/viewlocation",viewlocation)

export default router