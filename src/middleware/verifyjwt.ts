import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface DecorateRequest extends Request {
  userid?: string;
}
const verifyjwt = (req: DecorateRequest, res: Response, next: NextFunction) => {
  try {
    const jwttoken = req.cookies.accesstoken
    const decodedjwt = jwt.verify(jwttoken!, process.env.JSONSECRETKEY!);
    req.userid=decodedjwt as string
    next();
  } catch (error: any) {
    res.status(403).json({ success: false, data: error.message });
  }
};

export { verifyjwt };  
