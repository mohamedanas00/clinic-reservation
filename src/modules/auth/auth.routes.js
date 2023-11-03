import { Router } from "express";
import * as AuthRouter from "./controller/auth.js";
import { ValidationCoreFunction } from "../../middleware/validation.js";
import * as Validators from "./auth.validations.js";
const router = Router();

router.post(
  "/signup",
  ValidationCoreFunction(Validators.signUp),
  AuthRouter.signUp
);
router.post(
  "/signIn",
  ValidationCoreFunction(Validators.signIn),
  AuthRouter.signIn
);

export default router;
