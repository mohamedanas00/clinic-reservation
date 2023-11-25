import { StatusCodes } from "http-status-codes";
import slotModel from "../../../../DB/models/slot.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import appointmentModel from "../../../../DB/models/appointment.model.js";
import userModel from "../../../../DB/models/user.model.js";
import { notify } from "../../../utils/messagingFeature&mailSend.js";
import { Op } from 'sequelize';

export const addAppointment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const patientId = req.user.id;
  const slot = await slotModel.findOne({
    where: { id: id },
    include: [{ model: userModel }],
  });
  if (!slot) {
    return next(new ErrorClass("slot not found!", StatusCodes.NOT_FOUND));
  }

  if (slot.status != "available") {
    return next(new ErrorClass("slot not available!", StatusCodes.CONFLICT));
  }
  const appointmentExist = await appointmentModel.findOne({
    where: { userId: patientId, doctorId: slot.userId, status: "reserved" },
  });

  if (appointmentExist) {
    return next(
      new ErrorClass(
        `You already have appointment with this doctor ID:${slot.userId}`,
        StatusCodes.CONFLICT
      )
    );
  }
  slot.status = "reserved";
  await slot.save();
  await appointmentModel.create({
    slotId: id,
    userId: patientId,
    doctorId: slot.userId,
  });
  //*send email and create message
  const slotId = slot.id;
  const doctorId = slot.user.id;
  const doctorName = slot.user.name;
  const doctorEmail = slot.user.email;
  const statusMessage = "created";
  notify({
    req,
    patientId,
    doctorId,
    slotId,
    doctorName,
    doctorEmail,
    statusMessage,
  });
  return res.status(StatusCodes.CREATED).json({ message: "Done" });
});
//*Patients can view all his reservations
export const getAllAppointments = asyncHandler(async (req, res, next) => {
  const patientId = req.user.id;
  const appointments = await appointmentModel.findAll({
    where: { userId: patientId },
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
});
//*Patient can cancel his appointment.
export const cancelAppointment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const patientId = req.user.id;
  const appointment = await appointmentModel.findOne({
    where: { id: id, userId: patientId },
    include: [
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
  if (!appointment) {
    return next(
      new ErrorClass("Appointment Not Found!"),
      StatusCodes.NOT_FOUND
    );
  }

  if (appointment.status == "cancel") {
    return next(
      new ErrorClass("Appointment Already Cancel!"),
      StatusCodes.BAD_REQUEST
    );
  }

  const slotId = appointment.slot.id;
  await slotModel.update({ status: "available" }, { where: { id: slotId } });
  appointment.status = "cancel";

  appointment.save();

  const doctorId = appointment.doctorId;
  const doctorName = appointment.slot.user.name;
  const doctorEmail = appointment.slot.user.email;
  const statusMessage = "cancelled";
  notify({
    req,
    patientId,
    doctorId,
    slotId,
    doctorName,
    doctorEmail,
    statusMessage,
  });

  return res.status(StatusCodes.OK).json({ message: "Done" });
});

//*Patient can update his appointment by change the doctor or the slot.
export const updateAppointment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const patientId = req.user.id;
  const { slot } = req.body;
  let doctorId,
    doctorName,
    doctorEmail,
    slotId,
    check = false;
  const appointment = await appointmentModel.findOne({
    where: {
      id: id,
      userId: patientId,
    },
    include: [
      {
        model: slotModel,
        include: [
          {
            model: userModel,
          },
        ],
      },
    ],
  });

  if (!appointment) {
    return next(
      new ErrorClass("Appointment Not Found!"),
      StatusCodes.NOT_FOUND
    );
  }

  const slotExist = await slotModel.findOne({
    where: { id: slot },
    include: [{ model: userModel }],
  });
  if (!slotExist) {
    return next(new ErrorClass("slot not Found!"), StatusCodes.NOT_FOUND);
  }
  if (slotExist.status == "reserved") {
    return next(
      new ErrorClass("slot Already Reserved!"),
      StatusCodes.BAD_REQUEST
    );
  }
  if (appointment.status == "cancel") {
    return next(
      new ErrorClass("You can not make change Appointment is cancel!"),
      StatusCodes.BAD_REQUEST
    );
  }

  if (slotExist.userId != appointment.dataValues.doctorId) {
    doctorId = slotExist.user.id;
    doctorName = slotExist.user.name;
    doctorEmail = slotExist.user.email;
    slotId = slot;
    const statusMessage = "created";
    check = true;
    notify({
      req,
      patientId,
      doctorId,
      slotId,
      doctorName,
      doctorEmail,
      statusMessage,
    });
  }

  doctorId = appointment.slot.user.id;
  doctorName = appointment.slot.user.name;
  doctorEmail = appointment.slot.user.email;
  slotId = appointment.slot.id;

  if (check) {
    const statusMessage = "cancelled";
    notify({
      req,
      patientId,
      doctorId,
      slotId,
      doctorName,
      doctorEmail,
      statusMessage,
    });
  } else {
    const statusMessage = "updated";
    const newSlot = slot;
    notify({
      req,
      patientId,
      doctorId,
      slotId,
      doctorName,
      doctorEmail,
      statusMessage,
      newSlot,
    });
  }
  const Id = appointment.slot.id;
  await slotModel.update({ status: "available" }, { where: { id: Id } });
  await slotModel.update({ status: "reserved" }, { where: { id: slot } });
  await appointmentModel.update(
    { slotId: slot, doctorId: slotExist.user.id },
    { where: { id: id } }
  );

  return res.status(StatusCodes.OK).json({ message: "Done" });
});

//*Extra endPoint
export const getAppointmentsByDoctorName=asyncHandler(async(req,res,next)=>{
  const pageAsNumber=0;
  const patientId = req.user.id; 
  if(req.query.page){
     pageAsNumber =Number(req.query.page);
  }
  const appointments = await appointmentModel.findAll({
    where: { userId: patientId },
    attributes: { exclude: ["slotId", "userId"] },
    include: [
      {
        model: slotModel,
        include: [
          {
            model: userModel,
            name:{ [Op.like]: `%${req.query.name}%`},
            attributes: { exclude: ["password"] },
          },
        ],
      },
    ],
    include:{model:slotModel},
    limit:Number(process.env.page_limit),
    offset:pageAsNumber*Number(process.env.page_limit)
  });
    return res.status(StatusCodes.OK).json({ message: `done`, appointments });
})