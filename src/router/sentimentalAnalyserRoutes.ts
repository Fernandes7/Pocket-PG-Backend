import express from "express"
import { findsentimentalscore, sentimentalanalyzer, viewsentimentaldata } from "../controller/sentimentalAnalyser"

const router=express.Router()

router.post("/findscore",findsentimentalscore)
router.post("/sentimental",sentimentalanalyzer)
router.post("/vs",viewsentimentaldata)

export default router