import userModel from "../../../../DB/models/user.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { StatusCodes } from "http-status-codes";
import slotModel from "../../../../DB/models/slot.model.js";
import { ApiFeatures } from "../../../utils/apiFeatures.js";


export const GetDoctorsWithSlots = asyncHandler(
    async (req, res, next) => {
        const user = await userModel.findAll({
            where: {
                role: 'doctor'
            }, include: [
                {
                    model: slotModel,
                }
            ]
        });
        if (user.length == 0) {
            return next(new ErrorClass(`No doctors found `), StatusCodes.OK)
        }
        return res.status(StatusCodes.OK).json({ message: `doone`, user })
    }
)

export const GetDoctorWithMajors = asyncHandler(
    async (req, res, next) => {
        const { specialization } = req.body
        const user = await userModel.findAll({
            where: {
                role: 'doctor',
                specialization: specialization
            }, include: [
                {
                    model: slotModel,
                }
            ]
        });
        if (user.length == 0) {
            return next(new ErrorClass(`No doctors found `), StatusCodes.OK)
        }
        return res.status(StatusCodes.OK).json({ message: `doone`, user })
    }
)
export const getAllDoctors = asyncHandler(async (req, res, next) => {
    const user = await userModel.findAll({
        where: {
            role: 'doctor'
        }, include: [
            {
                model: slotModel,
            }
        ]
    });
        console.log(user);
        const features = new ApiFeatures(user, req.query) 
            .pagination(userModel);

        const doctors = await features.sequalizeQuery;
        if (doctors) {
            return res.status(StatusCodes.OK).json({ message: 'done', page: features.page, doctors: doctors });
        }
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: error.message });
    }

);






// where: {
//     role: 'doctor'
//   },include: [
//       {
//         model: slotModel,
//       }
//     ]}