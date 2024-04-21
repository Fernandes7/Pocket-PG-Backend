import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: "fernooxplozd@gmail.com",
    pass: "yxyk sdol clmg nwku"
    }
  });

  export {transporter}