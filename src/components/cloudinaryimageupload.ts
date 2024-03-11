import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

const uploadimagetocloudinary = async (imagebuffer: any) => {
  try {
    const tempFilePath = "temp_image.jpg";
    fs.writeFileSync(tempFilePath, imagebuffer);
    const uploadedimage = await cloudinary.uploader.upload(tempFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(tempFilePath);
    return uploadedimage;
  } catch (e: any) {
    return e;
  }
};

export { uploadimagetocloudinary };
