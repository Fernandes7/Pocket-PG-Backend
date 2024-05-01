import { transporter } from "../connections/emailconnection";

const sendReviewsEmail=async(hostelowneremail:any,hostelname:any,hostellocation:any)=>{
    try{
        const info = await transporter.sendMail({
            from: "fernandeskj007@gmail.com",
            to: hostelowneremail,
            subject: "Negative Staring based on User Reviews",
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Template</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f5f5f5;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .star-rating {
                        unicode-bidi: bidi-override;
                        color: #f0c419;
                        font-size: 25px;
                        margin-bottom: 10px;
                    }
                    .star-rating > span {
                        display: inline-block;
                        position: relative;
                        width: 1.1em;
                    }
                    .message {
                        text-align: center;
                        font-size: 18px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://img.freepik.com/premium-vector/downgrade-credit-rating-decrease-reputation-trust-score-drop-negative-feedback-loss-credit-score-reduction-concept-businessman-hit-star-credit-rating-with-big-hammer_610956-1801.jpg" alt="Company Logo" style="max-width: 100%;">
                    </div>
                    <div class="content">
                        <h2>Your Hostel Rating Has Been Decreased</h2>
                        <p class="message">We're sorry to inform you that your hostel ${hostelname} in ${hostellocation} rating has been decreased based on recent reviews.</p>
                        <p>Please review the reviews and take necessary actions in order to improve your hostel rating as soon as Possible</p>
                        <p class="message">Please <a href="your-website-url">visit our website</a> to learn more.</p>
                    </div>
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

export {sendReviewsEmail}