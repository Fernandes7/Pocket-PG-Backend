import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface DecorateRequest extends Request {
  userid?: string;
  username?: string;
}
const verifyjwt = (req: DecorateRequest, res: Response, next: NextFunction) => {
  try {
    const jwtwithBearer = req.headers.authorization;
    const jwttoken = jwtwithBearer && jwtwithBearer.split(" ")[1];
    const decodedjwt = jwt.verify(jwttoken!, process.env.JSONSECRETKEY!);
    req.userid=decodedjwt as string
    next();
  } catch (error: any) {
    res.status(403).json({ success: false, data: error.message });
  }
};

export { verifyjwt };  
