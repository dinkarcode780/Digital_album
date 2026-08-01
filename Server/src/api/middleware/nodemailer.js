import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import dns from "dns";

// Custom DNS lookup function to strictly enforce IPv4 address resolution
const ipv4Lookup = (hostname, options, callback) => {
  return dns.lookup(hostname, { family: 4 }, callback);
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  lookup: ipv4Lookup,
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
});

export const sendResetPasswordEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Album Studio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <h2>Password Reset OTP</h2>
      <p>Your password reset code is:</p>
      <h1 style="letter-spacing: 6px;">${otp}</h1>
      <p>This OTP is valid for 15 minutes.</p>
      <p>If you didn't request this, ignore this email.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Reset Email sent successfully:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw error;
  }
};
