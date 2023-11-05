import { Router } from "express";
import * as slotController from "./controller/slot.js";
import auth, { userAuth } from "../../middleware/auth.js";
import { ValidationCoreFunction } from "../../middleware/validation.js";
import * as Validators from "./slot.validation.js";

const slotRouter = Router();

slotRouter.route('/').post(auth(userAuth.doctor),ValidationCoreFunction(Validators.addSlot), slotController.addSlot);
slotRouter.route('/:slotId').patch(auth(userAuth.doctor),ValidationCoreFunction(Validators.updateSlot), slotController.updateSlot);

export default slotRouter;
