import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { createServer } from "http";
import databaseConnection from "./config/db.js";
import { createDefaultAdmin } from "./models/userModel.js";

const PORT = process.env.PORT || 1000;

await databaseConnection();
await createDefaultAdmin();
const serevr = createServer(app);


serevr.listen(PORT,()=>{

    console.log(`Serevr is running on port ${process.env.PORT}`)
})