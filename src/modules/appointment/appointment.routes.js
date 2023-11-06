import { Router } from "express";
import * as appointmentController from "./controller/appointment.js";
import auth, { userAuth } from "../../middleware/auth.js";
const router = Router();

router.route('/:slotId')
    .post(auth(userAuth.patient),appointmentController.addAppointment)

router.route('/')
    .get(auth(userAuth.patient),appointmentController.getAllAppointments)

export default router;
