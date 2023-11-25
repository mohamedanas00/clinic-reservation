import { StatusCodes } from "http-status-codes";
import messageModel from "../../DB/models/message.model.js";
import { ErrorClass } from "./errorClass.js";
import { emailHtml, sendEmail } from "./email.js";
import {sendMessage} from './rabbitMqSend.js' 
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
      patientPhone:req.user.phone,
      patientEmail:req.user.email,
    });
    const msg={"doctorId":doctorId,"patientId":patientId,"Operation":text};
    await sendMessage(doctorEmail,msg)
  } catch (error) {
    new ErrorClass(`Error for creating notify messaging`, StatusCodes.BAD_REQUEST)
  }
};
