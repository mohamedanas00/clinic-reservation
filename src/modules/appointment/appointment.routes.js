import { Router } from "express";
import * as appointmentController from "./controller/appointment.js";
import auth, { userAuth } from "../../middleware/auth.js";
import { ValidationCoreFunction } from "../../middleware/validation.js";
import * as Validators from "./appointment.validation.js";
const router = Router();

router.route('/:id')
    .post(auth(userAuth.patient),ValidationCoreFunction(Validators.addAppointment),appointmentController.addAppointment)
    .put(auth(userAuth.patient),ValidationCoreFunction(Validators.cancelAppointment),appointmentController.cancelAppointment)


router.route('/updateAppointment/:id')
    .put(auth(userAuth.patient),appointmentController.updateAppointment)



router.route('/')
    .get(auth(userAuth.patient),ValidationCoreFunction(Validators.getAllAppointments),appointmentController.getAllAppointments)

export default router;
