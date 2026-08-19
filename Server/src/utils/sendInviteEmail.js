import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const sendViaResend = async (email, inviteLink, name) => {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  if (!apiKey) return false;

  const senderEmail = process.env.RESEND_FROM || "Album Studio <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: senderEmail,
      to: [email],
      subject: "You're Invited to View Your Wedding Album 💍",
      html: getInviteHtml(inviteLink, name),
    }),
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(`Resend API error: ${resData.message || JSON.stringify(resData)}`);
  }

  console.log("Invite email sent successfully via Resend API:", resData);
  return true;
};

const sendViaBrevo = async (email, inviteLink, name) => {
  const apiKey = (process.env.BREVO_API_KEY || "").trim();
  if (!apiKey) return false;

  const senderEmail = process.env.EMAIL_USER || "info@albumstudio.com";

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Album Studio", email: senderEmail },
      to: [{ email, name }],
      subject: "You're Invited to View Your Wedding Album 💍",
      htmlContent: getInviteHtml(inviteLink, name),
    }),
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(`Brevo API error: ${resData.message || JSON.stringify(resData)}`);
  }

  console.log("Invite email sent successfully via Brevo API:", resData);
  return true;
};

const getInviteHtml = (inviteLink, name) => `
  <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:8px;">
    <h2 style="color:#7e22ce;">Album Studio</h2>
    <p>Hello <strong>${name}</strong>,</p>
    <p>You have been invited to access your wedding album.</p>
    <p>Click the button below to accept your invitation:</p>
    <div style="margin:24px 0;">
      <a
        href="${inviteLink}"
        style="
          display:inline-block;
          background:#7e22ce;
          color:#ffffff;
          padding:12px 28px;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
        "
      >
        Accept Invitation
      </a>
    </div>
    <p style="margin-top:20px;color:#555;font-size:14px;">Or copy this link in your browser:</p>
    <p style="word-break:break-all;font-size:13px;color:#7e22ce;">
      <a href="${inviteLink}">${inviteLink}</a>
    </p>
    <p style="margin-top:30px;color:#777;font-size:13px;">
      Regards,<br/>
      <strong>Album Studio Team</strong>
    </p>
  </div>
`;

const getTransporter = (port = 465) => {
  const user = (process.env.EMAIL_USER || "").trim();
  const pass = (process.env.EMAIL_PASSWORD || "").replace(/\s+/g, "");

  if (port === 465) {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
    });
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });
};

export const sendInviteEmail = async (email, inviteLink, name = "Guest") => {
  // 1. Try Resend HTTPS API if key exists (Never blocked on Render)
  if (process.env.RESEND_API_KEY) {
    return await sendViaResend(email, inviteLink, name);
  }

  // 2. Try Brevo HTTPS API if key exists (Never blocked on Render)
  if (process.env.BREVO_API_KEY) {
    return await sendViaBrevo(email, inviteLink, name);
  }

  // 3. Fallback to Nodemailer SMTP (Local / Unblocked environment)
  const user = (process.env.EMAIL_USER || "").trim();
  const pass = (process.env.EMAIL_PASSWORD || "").trim();

  if (!user || !pass) {
    throw new Error("EMAIL_USER or EMAIL_PASSWORD (or RESEND_API_KEY) is missing on server");
  }

  const mailOptions = {
    from: `"Album Studio" <${user}>`,
    to: email,
    subject: "You're Invited to View Your Wedding Album 💍",
    html: getInviteHtml(inviteLink, name),
  };

  try {
    console.log("Sending invite email via SMTP Port 465 to:", email);
    const transporter465 = getTransporter(465);
    const info = await transporter465.sendMail(mailOptions);
    console.log("Invite email sent successfully (Port 465):", info?.response || info);
    return true;
  } catch (err465) {
    console.warn("Port 465 failed:", err465.message, "-> Retrying via Port 587 fallback...");
    try {
      const fallbackTransporter = getTransporter(587);
      const fallbackInfo = await fallbackTransporter.sendMail(mailOptions);
      console.log("Invite email sent successfully (Fallback 587):", fallbackInfo?.response || fallbackInfo);
      return true;
    } catch (fallbackErr) {
      console.error("SMTP failed:", fallbackErr.message);
      throw new Error(
        "Render blocked SMTP port. Add RESEND_API_KEY to Render Environment to send emails via HTTPS."
      );
    }
  }
};

export default sendInviteEmail;