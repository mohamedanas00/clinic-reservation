import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const slotModel = sequelize.define(
  `slot`,
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "reserved", "cancel"),
      defaultValue: "available",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default slotModel;
