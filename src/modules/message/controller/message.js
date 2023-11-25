import { StatusCodes } from "http-status-codes";
import messageModel from "../../../../DB/models/message.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { receivedMessage } from "../../../utils/rabbitMqReceived.js";

export const getAllMessagingFeature = asyncHandler(async (req, res, next) => {
  const doctorId = req.user.id;
  const messages =await messageModel.findAll({
    where: { userId: doctorId },
  });
  return res.status(StatusCodes.OK).json({ message: "Done", messages });
});

export const getLastMessage = asyncHandler(async(req,res,next)=>{
  const doctorEmail = req.user.email;
  const messages = await receivedMessage(doctorEmail);
  return res.status(StatusCodes.OK).json({ message: "Done", messages });
})