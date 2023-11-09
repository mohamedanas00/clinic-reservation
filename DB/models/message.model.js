import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const messageModel = sequelize.define(
  `message`,
  {
    status: {
      type: DataTypes.ENUM("created", "updated","cancelled"),
      allowNull: false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
  },
  {
    timestamps: true,
  }
);


export default messageModel;
