import { Router } from "express";
import *as UserRouter from "./controller/user.js"
const router=Router()
router.get("/GetDoctorWithSlots",UserRouter.GetDoctorsWithSlots)
router.get("/GetSpacificMajor",UserRouter.GetDoctorWithMajors)
router.get("/",UserRouter.getAllDoctors)

export default router