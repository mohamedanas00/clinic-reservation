import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../../../utils/errorHandling.js";
import slotModel from "../../../../DB/models/slot.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import appointmentModel from "../../../../DB/models/appointment.model.js";
import userModel from "../../../../DB/models/user.model.js";

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

export const updateSlotDate = asyncHandler(async (req, res, next) => {
  const { slotId } = req.params;
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
  if (req.body.date) {
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

// export const cancelSlot = asyncHandler(async (req, res, next) => {
//   const { slotId } = req.params;
//   const doctorId = req.user.id;
//   const slot = await slotModel.findOne({
//     where: {
//       id: slotId,
//     },
//     include:[appointmentModel]
//   });
//   if (!slot) {
//     return next(new ErrorClass("slot not Exist!", StatusCodes.NOT_FOUND));
//   }

//   if (slot.userId != doctorId) {
//     return next(
//       new ErrorClass("You can not update this slot", StatusCodes.FORBIDDEN)
//     );
//   }

//   if(slot.status=='cancel'){
//     return next(
//       new ErrorClass("slot already cancel", StatusCodes.CONFLICT)
//     );
//   }

//   const appointmentId =slot.appointment.id;
//   console.log(appointmentId);



  
// });


export const getAllSlots =asyncHandler(async(req,res,next)=>{
  const doctorId = req.user.id;
  const slots = await slotModel.findAll({
    where: { userId: doctorId },
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: appointmentModel,
        attributes: {
          exclude: ["slotId", "userId"],
        },
        include:[
          {
            model: userModel,
            attributes: {
              exclude: ["password", "specialization"],
            },
          }
        ]
      },
    ],
  });
  
  return res.status(StatusCodes.CREATED).json({ message: "Done", slots });

})

//?get patients