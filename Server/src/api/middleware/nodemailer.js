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

  // Try Brevo first (if configured). If it fails, log and continue to other methods.
  if (process.env.BREVO_API_KEY) {
    try {
      console.log("Sending email via Brevo HTTP API...");
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Album Studio", email: process.env.EMAIL_USER || "digitalalbumstudio@gmail.com" },
          to: [{ email: email }],
          subject: mailOptions.subject,
          htmlContent: mailOptions.html,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Brevo API Error:", data);
      } else {
        console.log("Email sent successfully via Brevo API:", data);
        return true;
      }
    } catch (err) {
      console.error("Brevo request error:", err);
    }
  }

  // Try Resend next (if configured). If it fails (for example testing account restrictions), log and fall back.
  if (process.env.RESEND_API_KEY) {
    try {
      console.log("Sending email via Resend API...");
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || `Album Studio <${process.env.EMAIL_USER || 'onboarding@resend.dev'}>`,
          to: [email],
          subject: mailOptions.subject,
          html: mailOptions.html,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Resend API Error:", data);
      } else {
        console.log("Email sent successfully via Resend API:", data);
        return true;
      }
    } catch (err) {
      console.error("Resend request error:", err);
    }
  }

  try {
    console.log("Sending email via Nodemailer SMTP to:", email);
    const info = await transporter.sendMail(mailOptions);
    console.log("Nodemailer sendMail info:", info && info.response ? info.response : info);
    return true;
  } catch (err) {
    console.error("Nodemailer Error sending to", email, err);
    throw err;
  }
};
