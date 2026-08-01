import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
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
    console.log("Sending email via Nodemailer SMTP to:", email);
    const info = await transporter.sendMail(mailOptions);
    console.log(
      "Nodemailer sendMail info:",
      info && info.response ? info.response : info,
    );
    return true;
  } catch (err) {
    console.error("Nodemailer Error sending to", email, err);
    throw err;
  }
};
