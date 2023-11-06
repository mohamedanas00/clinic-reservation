import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import slotModel from "./slot.model.js";

const appointmentModel = sequelize.define(
  `appointment`,
  {
    status: {
      type: DataTypes.ENUM("reserved", "cancel"),
      defaultValue: "reserved",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
// Define the associations
slotModel.hasOne(appointmentModel);
appointmentModel.belongsTo(slotModel)

export default appointmentModel;
