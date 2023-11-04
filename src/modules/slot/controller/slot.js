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

export const updateSlot = asyncHandler(async (req, res, next) => {
  const {slotId} = req.params;
  const doctorId = req.user.id;
  const slot = await slotModel.findOne({
    where: {
      id: slotId,
    },
  });
  if (slot === null) {
    return next(new ErrorClass("slot not Exist!", StatusCodes.NOT_FOUND));
  }

  if (slot.userId != doctorId) {
    return next(
      new ErrorClass("You can not update this slot", StatusCodes.FORBIDDEN)
    );
  }
  if(req.body.status){
    slot.status = req.body.status;
  }
  if(req.body.date){
    if (slot.date == req.body.date) {
      return next(
        new ErrorClass("Already have slot in same time", StatusCodes.CONFLICT)
      );
    }
    slot.date = req.body.date;
  }

  await slot.save();
  return res.status(StatusCodes.CREATED).json({ message: "Done" });
});


