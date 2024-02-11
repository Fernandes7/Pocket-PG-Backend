import { createJsonwebtoken, createrefreshtoken } from "./jwttoken";
import { Types } from "mongoose";

const createandsendAccesstokenandRefreshToken=(userid:Types.ObjectId)=>{
    const accesstoken = createJsonwebtoken(userid);
      const refreshtoken = createrefreshtoken(userid);
      if (accesstoken && refreshtoken) {
        return {accesstoken,refreshtoken}

}
}

export {createandsendAccesstokenandRefreshToken}