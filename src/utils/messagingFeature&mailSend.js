import { StatusCodes } from "http-status-codes";
import messageModel from "../../DB/models/message.model.js";
import { ErrorClass } from "./errorClass.js";
import { emailHtml, sendEmail } from "./email.js";

export const notify = async ({patientId,doctorId,slotId,doctorName,doctorEmail,statusMessage,newSlot}={}) => {
  try {
    if(!newSlot){
      var text = `Patient with ID:${patientId} made Reservation${statusMessage} SlotId:${slotId}`;
    }else{
      var text = `Patient with ID:${patientId} made Reservation${statusMessage} SlotId:${slotId} to slotId:${newSlot}`;
    }
    const html = emailHtml(text, doctorName);
    sendEmail({ to: doctorEmail, subject: "Appointment Reservation", html });
    await messageModel.create({
      status: statusMessage,
      userId: doctorId,
      description: text,
    });
  } catch (error) {
    console.log(error);
    new ErrorClass(`Error for creating notify messaging`, StatusCodes.BAD_REQUEST)
  }
};
