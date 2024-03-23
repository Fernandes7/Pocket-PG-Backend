import express from "express"
import { findsentimentalscore, sentimentalanalyzer } from "../controller/sentimentalAnalyser"

const router=express.Router()

router.post("/findscore",findsentimentalscore)
router.post("/sentimental",sentimentalanalyzer)

export default router