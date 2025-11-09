//It is the  code for sending verification email to the user using resend 

// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY!);

// export async function sendVerificationEmail(to: string, code: string) {
//   try {
//     await resend.emails.send({
//       from: "Your App <onboarding@resend.dev>", // Default free domain
//       to,
//       subject: "Verify your email address",
//       html: `
//         <div style="font-family:sans-serif">
//           <h2>Welcome to Our App 🎉</h2>
//           <p>Your verification code is:</p>
//           <h3>${code}</h3>
//           <p>This code expires in 10 minutes.</p>
//         </div>
//       `,
//     });
//     return true;
//   } catch (error) {
//     console.error("Email send failed:", error);
//     return false;
//   }
// }

import nodemailer from "nodemailer" ;

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Wrap in an async IIFE so we can use await.
export async function sendVerificationEmail(to: string, code: string,name:string) {
  try {
    const info = await transporter.sendMail({
      from: `"JobPortal" <${process.env.SMTP_USER}>`, 
      to,
      subject: "Verify your email address",
      html: `
         <div style="font-family:sans-serif">
           <h2>${name},Welcome to Our App 🎉</h2>
          <p>Your verification code is:</p>
           <h3>${code}</h3>
          <p>This code expires in 10 minutes.</p>
      </div>
     `,
    });

    console.log("Message sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return false;
  }
}
