import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const slotModel = sequelize.define(
  `slot`,
  {
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
  },
  {
    timestamps: true,
  }
);

export default slotModel;
