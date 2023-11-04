import { Router } from "express";
import *as UserRouter from "./controller/user.js"
const router=Router()
router.get("/GetDoctorWithSlots",UserRouter.GetDoctorsWithSlots)
router.get("/GetDoctorWithMajors",UserRouter.GetDoctorWithMajors)
router.get("/searchByDoctorName",UserRouter.searchByDoctorName)

export default router