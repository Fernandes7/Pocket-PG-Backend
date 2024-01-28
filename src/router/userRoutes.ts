import express from "express";
import { finduserbyid, login, signUp, verify } from "../controller/userController";
import { verifyjwt } from "../middleware/verifyjwt";

const router = express.Router();


router.post("/signup", signUp);
router.post("/login",login);
router.get("/verifyjwt",verifyjwt,verify);
router.post("/finduserbyid",finduserbyid);

export default router; 
