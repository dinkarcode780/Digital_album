import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// import Routes
import userRoute from "./api/routes/userRoute.js";
import eventRoute from "./api/routes/eventRoute.js";
import eventCategoryRoute from "./api/routes/eventCategoryRoute.js";
import subcategoryRoute from "./api/routes/subCategoryRoute.js";
import mediaRoute from "./api/routes/mediaRoute.js";
import adminRoute from "./api/routes/adminRoute.js";
import inviteRoute from "./api/routes/inviteRoute.js";
import aboutRoute from "./api/routes/aboutRoute.js";
import serviceRoute from "./api/routes/serviceRoute.js";
import companyRoute from "./api/routes/companyRoute.js";
import memberRoute from "./api/routes/memberRoute.js";
import blogRoute from "./api/routes/blogRoute.js";
import userslectedMediaRoute from "./api/routes/userslectedMediaRoute.js";
import subscriptionRoute from "./api/routes/subscriptionRoute.js";
import subscriptionWebhookRoute from "./api/routes/subscriptionWebhookRoute.js";
import publicStudioRoute from "./api/routes/publicStudioRoute.js";
import studioShowcaseRoute from "./api/routes/studioShowcaseRoute.js";

app.use("/api/subscriptions/webhook", express.raw({ type: "application/json" }), subscriptionWebhookRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors({
    origin: process.env.CLIENT_URL || true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// API routes
app.use("/api", publicStudioRoute);
app.use("/api", studioShowcaseRoute);
app.use("/api", userRoute);
app.use("/api", eventRoute);
app.use("/api", eventCategoryRoute);
app.use("/api", subcategoryRoute);
app.use("/api", mediaRoute);
app.use("/api", adminRoute);
app.use("/api", inviteRoute);
app.use("/api", aboutRoute);
app.use("/api", serviceRoute);
app.use("/api", companyRoute);
app.use("/api", memberRoute);
app.use("/api", blogRoute);
app.use("/api", userslectedMediaRoute);
app.use("/api", subscriptionRoute);

export default app;