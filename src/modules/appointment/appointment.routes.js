import { Router } from "express";
import * as appointmentController from "./controller/appointment.js";
import auth, { userAuth } from "../../middleware/auth.js";
const router = Router();

router.route('/:id')
    .post(auth(userAuth.patient),appointmentController.addAppointment)
    .patch(auth(userAuth.patient),appointmentController.cancelAppointment)


router.route('/')
    .get(auth(userAuth.patient),appointmentController.getAllAppointments)

export default router;
