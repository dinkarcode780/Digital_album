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



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("tiny"));
app.use(cors({
    origin: ["http://localhost:5173"],
    // origin: ["https://digital-album-phi.vercel.app","https://digital-album-phi.vercel.app/","http://localhost:5173"],
    // origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }));


// User routes

app.use("/api",userRoute);
app.use("/api",eventRoute);
app.use("/api",eventCategoryRoute);
app.use("/api",subcategoryRoute);
app.use("/api",mediaRoute);
app.use("/api",adminRoute);
app.use("/api",inviteRoute);
app.use("/api",aboutRoute);
app.use("/api",serviceRoute)
app.use("/api",companyRoute);





export default app;