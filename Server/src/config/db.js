import mongoose  from "mongoose";

const databaseConnection = async()=>{

    const DB_URL = process.env.DB_URL;

    await mongoose.connect(DB_URL).then(async()=>{
        console.log("Databse connected succesfully");
    }).catch((error)=>console.log(error.message));
};


export default databaseConnection 