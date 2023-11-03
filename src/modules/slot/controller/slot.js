import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../../../utils/errorHandling.js";
import slotModel from "../../../../DB/models/slot.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";

export const addSlot = asyncHandler(async (req, res, next) => {
  const doctorId = req.user.id;
  const { date } = req.body;
  const checkDate = await slotModel.findOne({
    where: {
      date,
      userId: doctorId,
    },
  });
  if (checkDate) {
    return next(
      new ErrorClass("Already have slot in same time", StatusCodes.CONFLICT)
    );
  }
  const newSlot = await slotModel.create({
    date,
    userId: doctorId,
  });
  return res.status(StatusCodes.CREATED).json({ message: "Done", newSlot });
});


