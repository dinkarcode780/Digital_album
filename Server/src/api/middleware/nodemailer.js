import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import dns from "dns";

// Force IPv4 resolution order to avoid IPv6 ENETUNREACH on Render cloud servers
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  family: 4,
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
