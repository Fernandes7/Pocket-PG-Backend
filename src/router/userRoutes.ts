import express from "express";
import { NextFunction } from "express";
import { login, signUp, verify } from "../controller/userController";
import { verifyjwt } from "../middleware/verifyjwt";

const router = express.Router();


router.post("/signup", signUp);
router.post("/login",login)
router.get("/verifyjwt",verifyjwt,verify)

export default router; 
