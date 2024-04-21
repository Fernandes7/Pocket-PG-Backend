import { transporter } from "../connections/emailconnection";

const sendBookingEmail=async(useremail:string,username:string,hostelname:string,hostelimage:string,reference:any,date:any)=>{
    try{
        const info = await transporter.sendMail({
            from: "fernandeskj007@gmail.com",
            to: useremail,
            subject: "Booking Conformation from Pocket PG",
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Booking Confirmation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #fff;
                        border-radius: 8px;
                        padding: 20px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                    }
                    p {
                        color: #666;
                        font-size: 16px;
                        line-height: 1.6;
                        margin-bottom: 20px;
                    }
                    .booking-image {
                        text-align: center;
                        margin-bottom: 20px;
                        position: relative;
                    }
                    .booking-success {
                        position: absolute;
                        top: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        background-color: rgba(255, 255, 255, 0.8);
                        padding: 10px 20px;
                        border-radius: 5px;
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                        text-align: center;
                        z-index: 1;
                        animation: slideIn 1s ease-in-out;
                    }
                    @keyframes slideIn {
                        0% {
                            transform: translateX(-50%) translateY(-100%);
                        }
                        100% {
                            transform: translateX(-50%) translateY(0%);
                        }
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 8px;
                        animation: fadeIn 1s ease-in-out;
                    }
                    @keyframes fadeIn {
                        0% {
                            opacity: 0;
                        }
                        100% {
                            opacity: 1;
                        }
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background: blue;
                        color:black;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                        border: none;
                        transition: background 0.3s ease;
                    }
                    .button:hover {
                        background: linear-gradient(45deg, #FF9800, #FFC107);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Booking Confirmation</h1>
                    <div class="booking-image">
                        <img src=${hostelimage} alt="Booking Confirmation">
                    </div>
                    <p>Dear ${username},</p>
                    <p>We are pleased to inform you that your booking for Hostel<strong> ${hostelname}</strong> has been successfully confirmed. Below are the details of your booking:</p>
                    <p><strong>Booking Reference:</strong> ${reference}</p>
                    <p><strong>Booking Date:</strong> ${date}</p>
                    <p>Thank you for choosing our service. If you have any questions or need further assistance, feel free to contact us.</p>
                    <p>Best regards,<br> Pocket PG</p>
                    <p><a href="#" class="button">Visit our Website</a></p>
                </div>
            </body>
            </html>
            `,
          });
          if(info.messageId)
          return true
          else
          return false
        
        }
        catch(e:any)
        {
          return e.message
        }
}

export {sendBookingEmail}