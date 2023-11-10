import { Router } from "express";
import * as messageController from "./controller/message.js";
import auth, { userAuth } from "../../middleware/auth.js";
const messageRouter = Router();

messageRouter
  .route("/")
  .get(auth(userAuth.doctor), messageController.getAllMessagingFeature);

export default messageRouter;
