import { Router } from "express";
import * as messageController from "./controller/message.js";
import auth, { userAuth } from "../../middleware/auth.js";
import { ValidationCoreFunction } from "../../middleware/validation.js";
import * as Validators from "./message.validation.js";
const messageRouter = Router();

messageRouter
  .route("/")
  .get(auth(userAuth.doctor), ValidationCoreFunction(Validators.getAllMessagingFeature),messageController.getAllMessagingFeature);

export default messageRouter;
