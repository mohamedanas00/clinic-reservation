import { Router } from "express";
import * as slotController from "./controller/slot.js";
import auth, { userAuth } from "../../middleware/auth.js";

const slotRouter = Router();

slotRouter.route('/').post(auth(userAuth.doctor), slotController.addSlot);

export default slotRouter;