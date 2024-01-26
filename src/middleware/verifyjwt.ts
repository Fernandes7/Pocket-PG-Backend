import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


const verifyjwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtwithBearer = req.headers.authorization;
    const jwttoken = jwtwithBearer && jwtwithBearer.split(" ")[1];
    const decodedjwt = jwt.verify(jwttoken!, process.env.JSONSECRETKEY!);
    //@ts-ignore
    req.userid=decodedjwt
    next();
  } catch (error: any) {
    res.status(403).json({ success: false, data: error.message });
  }
};

export { verifyjwt };  
