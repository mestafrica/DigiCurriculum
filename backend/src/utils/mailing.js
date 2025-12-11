import { createTransport } from "nodemailer";
import "dotenv/config";

export const mailTransporter = createTransport({
  host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
  // service: 'gmail',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
console.log("sending mail")

// Dynamically generate email message 
export const emailMessage = `
<div>
<h1> Dear {{lastName}},</h1>
<p>Welcome onboard</p>
</div>
`;