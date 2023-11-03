import { Router } from "express";
import *as AuthRouter from "./controller/auth.js"
const router=Router()

router.post("/signup",AuthRouter.signUp)
router.post("/signin",AuthRouter.signin)



export default router 