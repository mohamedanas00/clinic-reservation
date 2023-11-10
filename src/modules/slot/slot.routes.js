import { Router } from "express";
import * as slotController from "./controller/slot.js";
import auth, { userAuth } from "../../middleware/auth.js";
import { ValidationCoreFunction } from "../../middleware/validation.js";
import * as Validators from "./slot.validation.js";

const slotRouter = Router();

slotRouter.route('/')
    .post(auth(userAuth.doctor),ValidationCoreFunction(Validators.addSlot), slotController.addSlot)
    .get(auth(userAuth.doctor),ValidationCoreFunction(Validators.getAllSlots), slotController.getAllSlots);

slotRouter.route('/:slotId').patch(auth(userAuth.doctor),ValidationCoreFunction(Validators.updateSlotDate), slotController.updateSlotDate);
// slotRouter.route('/:slotId').put(auth(userAuth.doctor), slotController.cancelSlot);

export default slotRouter;
