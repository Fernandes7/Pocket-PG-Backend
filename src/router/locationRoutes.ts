import express from "express"
import { addlocation } from "../controller/locationController"
import { upload } from "../connections/multer"

const router=express.Router()

router.post("/addlocation",upload.single("image"),addlocation)

export default router