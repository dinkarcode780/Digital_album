import https from "https";

export const sendSmsInvite = (mobile, inviteLink) => {
  return new Promise((resolve, reject) => {
    const authKey = process.env.MSG91_AUTH_KEY;
    const flowId = process.env.MSG91_INVITE_FLOW_ID || process.env.MSG91_FLOW_ID;

    if (!authKey || !flowId) {
      console.warn("MSG91 Auth Key or Flow ID not configured; skipping SMS invite.");
      return resolve(false);
    }

    let cleanMobile = String(mobile).replace(/\D/g, "");
    if (cleanMobile.length === 10) {
      cleanMobile = `91${cleanMobile}`;
    }

    const options = {
      method: "POST",
      hostname: "api.msg91.com",
      path: "/api/v5/flow/",
      headers: {
        authkey: authKey,
        "content-type": "application/json",
      },
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log("MSG91 Invite SMS Response:", data);
        resolve(true);
      });
    });

    req.on("timeout", () => {
      req.destroy();
      console.error("MSG91 Invite SMS Request timed out.");
      resolve(false);
    });

    req.on("error", (err) => {
      console.error("MSG91 Invite SMS Error:", err.message);
      resolve(false);
    });

    req.write(
      JSON.stringify({
        flow_id: flowId,
        sender: process.env.MSG91_SENDER || "ALBUM",
        mobiles: cleanMobile,
        name: "Album Studio",
        link: inviteLink,
      })
    );

    req.end();
  });
};

export default sendSmsInvite;