import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { createServer } from "http";
import databaseConnection from "./config/db.js";
import { createDefaultAdmin } from "./models/userModel.js";

const PORT = process.env.PORT || 1000;

await databaseConnection();
await createDefaultAdmin();
const server = createServer(app);


server.listen(PORT,()=>{

    console.log(`Server is running on port ${process.env.PORT}`)
})