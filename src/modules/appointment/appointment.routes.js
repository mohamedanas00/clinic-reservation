import { Router } from "express";
import * as appointmentController from "./controller/appointment.js";
import auth, { userAuth } from "../../middleware/auth.js";
const router = Router();

router.route('/:id')
    .post(auth(userAuth.patient),appointmentController.addAppointment)
    .put(auth(userAuth.patient),appointmentController.cancelAppointment)
    .patch(auth(userAuth.patient),appointmentController.updateAppointment)

router.route('/')
    .get(auth(userAuth.patient),appointmentController.getAllAppointments)

export default router;
