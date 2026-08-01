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
    from: `"Album Studio" <${process.env.EMAIL_USER || "onboarding@resend.dev"}>`,
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

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Album Studio <onboarding@resend.dev>",
        to: [email],
        subject: mailOptions.subject,
        html: mailOptions.html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to send email via Resend API");
    }
    return true;
  }

  await transporter.sendMail(mailOptions);
};
