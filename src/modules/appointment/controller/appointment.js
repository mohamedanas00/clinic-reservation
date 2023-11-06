import { StatusCodes } from "http-status-codes";
import slotModel from "../../../../DB/models/slot.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import appointmentModel from "../../../../DB/models/appointment.model.js";
import userModel from "../../../../DB/models/user.model.js";

export const addAppointment = asyncHandler(async (req, res, next) => {
  const { slotId } = req.params;
  const patientId = req.user.id;
  console.log(req.user.id);
  const slot = await slotModel.findOne({ where: { id: slotId } });
  if (!slot) {
    return next(new ErrorClass("slot not found!", StatusCodes.NOT_FOUND));
  }

  if (slot.status == "reserved") {
    return next(
      new ErrorClass("slot already reserved!", StatusCodes.CONFLICT)
    );
  }

  if (slot.status == "cancel") {
    return next(
      new ErrorClass("Doctor cancel this slot", StatusCodes.CONFLICT)
    );
  }
  slot.status = "reserved";
  await slot.save();
  const newAppointment = await appointmentModel.create({
    slotId,
    userId: patientId,
  });

  const appointment = await appointmentModel.findOne({
    where: { id: newAppointment.id },
    attributes: { exclude: ["slotId", "userId"] },
    include: [
      {
        model: userModel,
        attributes: {
          exclude: ["password", "specialization"],
        },
      },
      {
        model: slotModel,
        include: [
          {
            model: userModel,
            attributes: { exclude: ["password"] },
          },
        ],
      },
    ],
  });
  return res.status(StatusCodes.CREATED).json({ message: "Done", appointment });
});


export const getAllAppointments =asyncHandler(async(req,res,next)=>{
    const patientId = req.user.id;
    const appointments = await appointmentModel.findAll({
        where:{userId:patientId},
        attributes: { exclude: ["slotId", "userId"] },
        include: [
          {
            model: userModel,
            attributes: {
              exclude: ["password", "specialization"],
            },
          },
          {
            model: slotModel,
            include: [
              {
                model: userModel,
                attributes: { exclude: ["password"] },
              },
            ],
          },
        ],
    });
    return res.status(StatusCodes.OK).json({ message: "Done", appointments });
})