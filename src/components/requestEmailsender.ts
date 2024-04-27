import { transporter } from "../connections/emailconnection";

const sendRequestEmail=async(data:any)=>{
    try{
        const info = await transporter.sendMail({
            from: "fernandeskj007@gmail.com",
            to: "fernooxplozd@gmail.com",
            subject: "Request for Hostel Enquiry",
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pocket Pg Enquiry</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f0f0f0;
              }
            
              .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #fff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              }
            
              h1 {
                text-align: center;
                color: #333;
                margin-bottom: 30px;
              }
            
              p {
                color: #555;
                line-height: 1.6;
              }
            
              .signature {
                margin-top: 30px;
                text-align: center;
              }
            
              .signature img {
                width: 150px;
                height: auto;
                border-radius: 50%;
              }
            </style>
            </head>
            <body>
              <div class="container">
                <h1>Hostel Ad Inquiry Received</h1>
                <p>Dear Pocket Pg Admin,</p>
                <p>you have received an inquiry regarding advertising with our hostel from ${data.name}.</p>
                <p>The Contact no of Requestor: ${data.contactno}</p>
                <p>The Email id of Requestor: ${data.emailid}</p>
                <p>This is the Detailed Description send by user</p>
                <p>${data.data}</p>
                <div class="signature">
                  <img src="https://st.depositphotos.com/1005979/4155/i/950/depositphotos_41559979-stock-photo-request-envelope.jpg" alt="Your Signature">
                </div>
              </div>
            </body>
            </html>
            `
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

export {sendRequestEmail}