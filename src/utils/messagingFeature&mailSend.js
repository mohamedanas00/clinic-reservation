import { StatusCodes } from "http-status-codes";
import messageModel from "../../DB/models/message.model.js";
import { ErrorClass } from "./errorClass.js";
import { emailHtml, sendEmail } from "./email.js";

export const notify = async ({req,patientId,doctorId,slotId,doctorName,doctorEmail,statusMessage,newSlot}={}) => {
  try {
    if(!newSlot){
      var text = `Patient ${req.user.name} with ID:${patientId} made Reservation ${statusMessage} at SlotId:${slotId}`;
    }else{
      var text = `Patient ${req.user.name} with ID:${patientId} made Reservation ${statusMessage} from SlotId:${slotId} to slotId:${newSlot}`;
    }
    const html = emailHtml(text, doctorName);
    sendEmail({ to: doctorEmail, subject: "Appointment Reservation", html });
    await messageModel.create({
      status: statusMessage,
      userId: doctorId,
      description: text,
      patientName:req.user.name,
      patientEmail:req.user.email,
      patientPhone:req.user.phone,
    });
  } catch (error) {
    console.log(error);
    new ErrorClass(`Error for creating notify messaging`, StatusCodes.BAD_REQUEST)
  }
};
