import { Router } from "express";
import *as UserRouter from "./controller/user.js"
import { ValidationCoreFunction } from "../../middleware/validation.js";
import * as Validators from "./user.validation.js";
const router=Router()
router.get("/GetDoctorWithSlots",ValidationCoreFunction(Validators.GetDoctorsWithSlots),UserRouter.GetDoctorsWithSlots)
router.get("/GetDoctorWithMajors",ValidationCoreFunction(Validators.GetDoctorWithMajors),UserRouter.GetDoctorWithMajors)
router.get("/searchByDoctorName",ValidationCoreFunction(Validators.searchByDoctorName),UserRouter.searchByDoctorName)

export default router
