import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  family: 4,
});

export const sendInviteEmail = async (email, inviteLink, name) => {
  const mailOptions = {
    from: `"Album Studio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "You're Invited to View Your Wedding Album 💍",

    html: `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>Album Studio</h2>

        <p>Hello <strong>${name}</strong>,</p>

        <p>
          You have been invited to access your wedding album.
        </p>

        <p>
          Click the button below to accept your invitation.
        </p>

        <a
          href="${inviteLink}"
          style="
            display:inline-block;
            background:#7e22ce;
            color:#fff;
            padding:12px 24px;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Accept Invitation
        </a>

        <p style="margin-top:20px">
          Or copy this link:
        </p>

        <p>${inviteLink}</p>

        <p>
          Regards,<br/>
          Album Studio
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};