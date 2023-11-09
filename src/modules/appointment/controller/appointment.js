import { StatusCodes } from "http-status-codes";
import slotModel from "../../../../DB/models/slot.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import appointmentModel from "../../../../DB/models/appointment.model.js";
import userModel from "../../../../DB/models/user.model.js";
import { notify } from "../../../utils/messagingFeature&mailSend.js";

export const addAppointment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const patientId = req.user.id;
  const { symptoms } = req.body;
  const slot = await slotModel.findOne({
    where: { id: id },
    include: [userModel],
  });
  if (!slot) {
    return next(new ErrorClass("slot not found!", StatusCodes.NOT_FOUND));
  }

  if (slot.status != "available") {
    return next(new ErrorClass("slot not available!", StatusCodes.CONFLICT));
  }
  const appointmentExist = await appointmentModel.findOne({
    where: { userId: patientId, doctorId: slot.userId },
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
  const newAppointment = await appointmentModel.create({
    slotId: id,
    userId: patientId,
    doctorId: slot.userId,
    symptoms,
  });
  //*send email and create message
  const slotId = slot.id;
  const doctorId = slot.user.id;
  const doctorName = slot.user.name;
  const doctorEmail = slot.user.email;
  const statusMessage = "created";
  notify({
    patientId,
    doctorId,
    slotId,
    doctorName,
    doctorEmail,
    statusMessage,
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
//!Patients can view all his reservations
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
//! Patient can cancel his appointment.
export const cancelAppointment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const patientId = req.user.id;
  const appointment = await appointmentModel.findOne({
    where: { userId: patientId },
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
  appointment.slotId = null;

  appointment.save();

  const doctorId = appointment.doctorId;
  const doctorName = appointment.slot.user.name;
  const doctorEmail = appointment.slot.user.email;
  const statusMessage = "cancelled";
  notify({
    patientId,
    doctorId,
    slotId,
    doctorName,
    doctorEmail,
    statusMessage,
  });

  return res.status(StatusCodes.OK).json({ message: "Done" });
});

//!Patient can update his appointment by change the doctor or the slot.
export const updateAppointment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const patientId = req.user.id;
  const { slot } = req.body;
  let doctorId;
  let doctorName;
  let doctorEmail;
  let slotId;
  let statusMessage;
  let check = false;
  const appointment = await appointmentModel.findOne({
    where: {
      id: id,
      userId: patientId,
    },
    include: [{ slotModel }],
  });
  if (!appointment) {
    return next(
      new ErrorClass("Appointment Not Found!"),
      StatusCodes.NOT_FOUND
    );
  }
  const slotExist = await slotModel.findOne({
    where: { id: slot },
    include: [{ userModel }],
  });
  if (!slotExist) {
    return next(new ErrorClass("slot not Found!"), StatusCodes.NOT_FOUND);
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
    statusMessage = "crated";
    check = true;
    notify({
      patientId,
      doctorId,
      slotId,
      doctorName,
      doctorEmail,
      statusMessage,
    });
  }
  doctorId = appointment.slot.id;
  doctorName = appointment.slot.user.name;
  doctorEmail = appointment.slot.user.email;
  slotId = appointment.slot.id;
  if (check) {
    statusMessage = "cancelled";
    notify({
      patientId,
      doctorId,
      slotId,
      doctorName,
      doctorEmail,
      statusMessage,
    });
  } else {
    statusMessage = "updated";
    const newSlot = slot;
    notify({
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
    { where: { id: id } },
    { slotId: slot, doctorId: slotExist.user.id }
  );

  return res.status(StatusCodes.OK).json({ message: "Done" });
});
