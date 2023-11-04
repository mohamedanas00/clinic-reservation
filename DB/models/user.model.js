import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import slotModel from "./slot.model.js";
import appointmentModel from "./appointment.model.js";

const userModel = sequelize.define(
  `user`,
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("doctor", "patient"),
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define the associations
userModel.hasMany(slotModel, {
  onDelete: 'CASCADE', // Add CASCADE option for deletion
  onUpdate: 'CASCADE', // Add CASCADE option for update
});

userModel.hasMany(appointmentModel, {
  onDelete: 'CASCADE', // Add CASCADE option for deletion
  onUpdate: 'CASCADE', // Add CASCADE option for update
});

appointmentModel.belongsTo(userModel)

slotModel.belongsTo(userModel)
 

export default userModel;
