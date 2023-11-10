import userModel from "../../../../DB/models/user.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { StatusCodes } from "http-status-codes";
import slotModel from "../../../../DB/models/slot.model.js";
import { Op } from 'sequelize';


export const GetDoctorsWithSlots = asyncHandler(async (req, res, next) => {
  const user = await userModel.findAll({
    where: {
      role: "doctor",
    },
    attributes:{exclude:['password']},
    include: [
        {
          model: slotModel,
        },
      ],
  });
  if (user.length == 0) {
    return next(new ErrorClass(`No doctors found `), StatusCodes.OK);
  }
  return res.status(StatusCodes.OK).json({ message: `done`, user });
});

export const GetDoctorWithMajors = asyncHandler(async (req, res, next) => {
  const { specialization } = req.body;
  const user = await userModel.findAll({
    where: {
      role: "doctor",
      specialization: specialization,
    },
    attributes:{exclude:['password']},
    include: [
      {
        model: slotModel,
      },
    ],
  });
  if (user.length == 0) {
    return next(new ErrorClass(`No doctors found `), StatusCodes.OK);
  }
  return res.status(StatusCodes.OK).json({ message: `done`, user });
});

export const searchByDoctorName = asyncHandler(async (req, res, next) => {
  const pageAsNumber=0;
  if(req.query.page){
     pageAsNumber =Number(req.query.page);
  }

  const doctor = await userModel.findAll({ 
    where: {
      name:{ [Op.like]: `%${req.query.name}%`},
      role: "doctor",
    },
    attributes:{exclude:['password']},
    include:{model:slotModel},
    limit:Number(process.env.page_limit),
    offset:pageAsNumber*Number(process.env.page_limit)

  });
    

    return res.status(StatusCodes.OK).json({ message: `done`, doctor });

});

export const getDoctorSlotById=asyncHandler(async(req,res,next)=>{
  const{id}=req.params;
  console.log(id);
  const doctor=await slotModel.findAll({where: {
    userId:id,
  },})
  if (doctor.length==0) {
    return next(new ErrorClass(`No doctors found `), StatusCodes.OK);
  }
  return res.status(StatusCodes.OK).json({ message: `done`, doctor });

})
