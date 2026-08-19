import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const getTransporter = (port = 465) => {
  const user = (process.env.EMAIL_USER || "").trim();
  // Remove any spaces if user pasted 16-character App Password with spaces
  const pass = (process.env.EMAIL_PASSWORD || "").replace(/\s+/g, "");

  if (port === 465) {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
    });
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });
};

export const sendInviteEmail = async (email, inviteLink, name = "Guest") => {
  const user = (process.env.EMAIL_USER || "").trim();
  const pass = (process.env.EMAIL_PASSWORD || "").trim();

  if (!user || !pass) {
    console.error("EMAIL_USER or EMAIL_PASSWORD missing. EMAIL_USER:", user ? "Set" : "Missing", "EMAIL_PASSWORD:", pass ? "Set" : "Missing");
    throw new Error("EMAIL_USER or EMAIL_PASSWORD environment variable is missing on server");
  }

  const mailOptions = {
    from: `"Album Studio" <${user}>`,
    to: email,
    subject: "You're Invited to View Your Wedding Album 💍",

    html: `
      <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:8px;">
        <h2 style="color:#7e22ce;">Album Studio</h2>

        <p>Hello <strong>${name}</strong>,</p>

        <p>
          You have been invited to access your wedding album.
        </p>

        <p>
          Click the button below to accept your invitation:
        </p>

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

        <p style="margin-top:20px;color:#555;font-size:14px;">
          Or copy this link in your browser:
        </p>

        <p style="word-break:break-all;font-size:13px;color:#7e22ce;">
          <a href="${inviteLink}">${inviteLink}</a>
        </p>

        <p style="margin-top:30px;color:#777;font-size:13px;">
          Regards,<br/>
          <strong>Album Studio Team</strong>
        </p>
      </div>
    `,
  };

  // Try Port 465 (SSL) first, then fallback to service: 'gmail' (Port 587)
  try {
    console.log("Attempting to send invite email to:", email, "via Port 465 SSL...");
    const transporter465 = getTransporter(465);
    const info = await transporter465.sendMail(mailOptions);
    console.log("Invite email sent successfully (Port 465):", info?.response || info);
    return true;
  } catch (err465) {
    console.warn("Port 465 attempt failed:", err465.message, "-> Retrying via Gmail Service fallback...");
    try {
      const fallbackTransporter = getTransporter(587);
      const fallbackInfo = await fallbackTransporter.sendMail(mailOptions);
      console.log("Invite email sent successfully (Fallback):", fallbackInfo?.response || fallbackInfo);
      return true;
    } catch (fallbackErr) {
      console.error("All email send attempts failed for:", email, fallbackErr.message);
      throw new Error(fallbackErr.message || err465.message || "Failed to send email");
    }
  }
};

export default sendInviteEmail;