import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_DBNAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export const connectDB = async () => {
  return await sequelize
    .sync({ alter: false })
    .then((Result) => {
      console.log(`DB Connected`);
    })
    .catch((err) => {
      console.log(`FAIL to connect DB ......${err}`);
    });
};

export default connectDB;
