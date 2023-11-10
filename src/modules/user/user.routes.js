import { Router } from "express";
import *as UserRouter from "./controller/user.js"
import { ValidationCoreFunction } from "../../middleware/validation.js";
import * as Validators from "./user.validation.js";
import auth, { userAuth } from "../../middleware/auth.js";
const router=Router()
router.get("/GetDoctorWithSlots",auth(userAuth.patient),ValidationCoreFunction(Validators.GetDoctorsWithSlots),UserRouter.GetDoctorsWithSlots)
router.get("/GetDoctorWithMajors",auth(userAuth.patient),ValidationCoreFunction(Validators.GetDoctorWithMajors),UserRouter.GetDoctorWithMajors)
router.get("/searchByDoctorName",auth(userAuth.patient),ValidationCoreFunction(Validators.searchByDoctorName),UserRouter.searchByDoctorName)
router.get("/getSlotByDrId/:id",auth(userAuth.patient),ValidationCoreFunction(Validators.getDoctorSlotById),UserRouter.getDoctorSlotById)

export default router