import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../../../utils/errorHandling.js";
import slotModel from "../../../../DB/models/slot.model.js";

export const addSlot = asyncHandler(async (req, res, next) => {
  const doctorId = req.user.id;
  console.log(doctorId);
  const { date } = req.body;
  const newSlot = await slotModel.create({
    date,
  });
  return res.status(StatusCodes.CREATED).json({ message: "Done", newSlot })
});
