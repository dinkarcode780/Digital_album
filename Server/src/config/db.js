import mongoose from "mongoose";

const databaseConnection = () => {
  const DB_URL = process.env.DB_URL;

  mongoose
    .connect(DB_URL)
    .then(async () => {
      console.log("Databse connected succesfully");
    })
    .catch((error) => console.log(error));
};

export default databaseConnection;
