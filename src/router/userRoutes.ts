import express from "express";
import { login, signUp } from "../controller/userController";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login",login)

export default router;
