import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

export const sendInviteEmail = async (email, inviteLink, name = "Guest") => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error("EMAIL_USER or EMAIL_PASSWORD environment variable is missing on server");
  }

  const mailOptions = {
    from: `"Album Studio" <${process.env.EMAIL_USER}>`,
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

  try {
    console.log("Sending invite email to:", email, "name:", name);
    const info = await transporter.sendMail(mailOptions);
    console.log("Invite email sent:", info && info.response ? info.response : info);
    return true;
  } catch (err) {
    console.error("Failed to send invite email to", email, err);
    throw err;
  }
};

export default sendInviteEmail;