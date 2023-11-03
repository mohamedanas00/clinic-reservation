import { Router } from "express";
import *as AuthRouter from "./controller/auth.js"
import {ValidationCoreFunction} from "../../middleware/validation.js"
import * as Validators from "./auth.validations.js";
const router=Router()

router.post("/signup",ValidationCoreFunction(Validators.signup),AuthRouter.signUp)
router.post("/signin",ValidationCoreFunction(Validators.signin),AuthRouter.signin)



export default router 