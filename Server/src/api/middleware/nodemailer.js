import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const getResetOtpHtml = (otp) => `
  <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:8px;">
    <h2 style="color:#2563eb;">Album Studio</h2>
    <p>Password Reset Request</p>
    <p>Your password reset code is:</p>
    <div style="text-align:center;margin:24px 0;">
      <span style="display:inline-block;padding:12px 30px;font-size:32px;font-weight:bold;letter-spacing:6px;background:#f3f4f6;color:#2563eb;border-radius:8px;border:2px dashed #2563eb;">
        ${otp}
      </span>
    </div>
    <p style="color:#555;font-size:14px;">This OTP is valid for 15 minutes.</p>
    <p style="color:#777;font-size:13px;">If you didn't request this, you can ignore this email.</p>
  </div>
`;

export const sendResetPasswordEmail = async (email, otp) => {
  // 1. Resend HTTPS API
  if (process.env.RESEND_API_KEY) {
    const senderEmail = process.env.RESEND_FROM || "Album Studio <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderEmail,
        to: [email],
        subject: "Password Reset OTP",
        html: getResetOtpHtml(otp),
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(`Resend OTP Error: ${err.message || JSON.stringify(err)}`);
    }
    return true;
  }

  // 2. Nodemailer SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: (process.env.EMAIL_USER || "").trim(),
      pass: (process.env.EMAIL_PASSWORD || "").replace(/\s+/g, ""),
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });

  const mailOptions = {
    from: `"Album Studio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    html: getResetOtpHtml(otp),
  };

  try {
    console.log("Sending OTP email to:", email);
    const info = await transporter.sendMail(mailOptions);
    console.log("Nodemailer sendMail info:", info?.response || info);
    return true;
  } catch (err) {
    console.error("Nodemailer Error sending to", email, err);
    throw err;
  }
};

// import dotenv from "dotenv";
// dotenv.config();

// import nodemailer from "nodemailer";

// // Create Transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// // Verify SMTP Connection
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("❌ SMTP Connection Error:", error.message);
//   } else {
//     console.log("✅ SMTP Server is ready to send emails");
//   }
// });

// // Send Reset Password OTP Email
// export const sendResetPasswordEmail = async (email, otp) => {
//   try {
//     if (!email) {
//       throw new Error("Recipient email is required.");
//     }

//     if (!otp) {
//       throw new Error("OTP is required.");
//     }

//     const mailOptions = {
//       from: `"Album Studio" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Password Reset OTP",
//       html: `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//       </head>
//       <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
//         <div style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">

//           <div style="background:#2563eb;padding:20px;text-align:center;">
//             <h1 style="color:#ffffff;margin:0;">Album Studio</h1>
//           </div>

//           <div style="padding:30px;">

//             <h2 style="margin-top:0;color:#333;">
//               Password Reset Request
//             </h2>

//             <p style="font-size:16px;color:#555;">
//               We received a request to reset your password.
//             </p>

//             <p style="font-size:16px;color:#555;">
//               Please use the OTP below to continue:
//             </p>

//             <div style="text-align:center;margin:30px 0;">
//               <span style="
//                 display:inline-block;
//                 padding:15px 35px;
//                 font-size:32px;
//                 font-weight:bold;
//                 letter-spacing:8px;
//                 background:#f3f4f6;
//                 color:#2563eb;
//                 border-radius:8px;
//                 border:2px dashed #2563eb;
//               ">
//                 ${otp}
//               </span>
//             </div>

//             <p style="font-size:15px;color:#555;">
//               ⏳ This OTP is valid for
//               <strong>15 minutes</strong>.
//             </p>

//             <p style="font-size:15px;color:#555;">
//               If you did not request a password reset,
//               you can safely ignore this email.
//             </p>

//           </div>

//           <div style="background:#f9fafb;padding:15px;text-align:center;font-size:13px;color:#777;">
//             © ${new Date().getFullYear()} Album Studio. All Rights Reserved.
//           </div>

//         </div>
//       </body>
//       </html>
//       `,
//     };

//     console.log(`📧 Sending OTP email to ${email}...`);

//     const info = await transporter.sendMail(mailOptions);

//     console.log("✅ Email Sent Successfully");
//     console.log("Message ID:", info.messageId);
//     console.log("Response:", info.response);

//     return true;
//   } catch (error) {
//     console.error("❌ Email Sending Failed:", error.message);
//     throw error;
//   }
// };
