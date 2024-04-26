import express from "express";
import { finduserbyid, login, signUp, upDateuser, verify } from "../controller/userController";
import { verifyjwt } from "../middleware/verifyjwt";

const router = express.Router();


router.post("/signup", signUp);
router.post("/login",login);
router.get("/verifyjwt",verifyjwt,verify);
router.post("/finduserbyid",finduserbyid);
router.post("/updateuser",upDateuser)

export default router; 
