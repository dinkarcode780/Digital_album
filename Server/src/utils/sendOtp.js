import http from "http";

const otpLimits = {};

const OTP_LIMIT = 5;
const OTP_WINDOW = 60 * 60 * 1000; // 1 Hourx

export const sendOtp = (mobile, otp) => {
  return new Promise((resolve, reject) => {
    const currentTime = Date.now();

    if (!otpLimits[mobile]) {
      otpLimits[mobile] = {
        count: 0,
        firstSentTime: currentTime,
      };
    }

    const { count, firstSentTime } = otpLimits[mobile];

    if (currentTime - firstSentTime < OTP_WINDOW) {
      if (count >= OTP_LIMIT) {
        return resolve(false);
      }
    } else {
      otpLimits[mobile] = {
        count: 0,
        firstSentTime: currentTime,
      };
    }

    const options = {
      method: "POST",
      hostname: "api.msg91.com",
      path: "/api/v5/flow/",
      headers: {
        authkey: process.env.MSG91_AUTH_KEY,
        "content-type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log("MSG91 Response:", data);

        otpLimits[mobile].count++;

        resolve(true);
      });
    });

    req.on("error", (err) => {
      console.log(err);
      reject(err);
    });

    req.write(
      JSON.stringify({
        flow_id: process.env.MSG91_FLOW_ID,
        sender: process.env.MSG91_SENDER,
        mobiles: `91${mobile}`,
        otp: otp,
      })
    );

    req.end();
  });
};