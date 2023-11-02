import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connectDB = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
});

// Add a 'connect' event listener to check the connection status
connectDB.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL with threadId: " + connectDB.threadId);
});

export default connectDB;
